/**
 * Tạo file lịch chuẩn RFC 5545 (.ics) và liên kết Google Calendar
 * trực tiếp từ cấu hình sự kiện tập trung.
 */

function formatIcsLocalDate(isoString) {
  return isoString.replace(/[-:]/g, '').slice(0, 15);
}

function escapeIcsText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function buildCalendarDetails(config) {
  const { graduate, ceremony, project } = config;
  const title = `${project.title} — Lễ Tốt Nghiệp của ${graduate.fullName}`;
  const location = `${ceremony.venueName}, ${ceremony.fullAddress}`;
  const description = [
    `Trân trọng kính mời bạn đến chung vui trong lễ tốt nghiệp của ${graduate.fullName} (${graduate.university}, ${graduate.classLabel}).`,
    `Trang phục: ${ceremony.dressCode}`,
    `Bản đồ: ${ceremony.mapsUrl}`,
  ].join('\n');

  return {
    title,
    location,
    description,
    startLocal: formatIcsLocalDate(ceremony.isoStart),
    endLocal: formatIcsLocalDate(ceremony.isoEnd),
    timezone: ceremony.timezone || 'Asia/Ho_Chi_Minh',
  };
}

export function downloadIcsFile(config) {
  const details = buildCalendarDetails(config);
  const nowStamp = `${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chuong Cuoi//Thiep Moi Tot Nghiep//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:chuong-cuoi-${details.startLocal}@graduation`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART;TZID=${details.timezone}:${details.startLocal}`,
    `DTEND;TZID=${details.timezone}:${details.endLocal}`,
    `SUMMARY:${escapeIcsText(details.title)}`,
    `LOCATION:${escapeIcsText(details.location)}`,
    `DESCRIPTION:${escapeIcsText(details.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'thiep-moi-tot-nghiep.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(config) {
  const details = buildCalendarDetails(config);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title,
    dates: `${details.startLocal}/${details.endLocal}`,
    ctz: details.timezone,
    location: details.location,
    details: details.description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
