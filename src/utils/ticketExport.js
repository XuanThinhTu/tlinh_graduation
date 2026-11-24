/**
 * Xuất Thẻ Mời Kỷ Niệm (Collectible Keepsake Card) độ phân giải cao 1600×960 PNG
 * hoàn toàn phía trình duyệt (100% client-side), hỗ trợ 3 phong cách thiệp
 * kèm ảnh chân dung thật của tân cử nhân.
 */

export const KEEPSAKE_THEMES = {
  navy: {
    id: 'navy',
    label: 'Navy Điện Ảnh',
    photo: '/assets/photo-05.jpg',
    bg: '#1B2340',
    bgSecondary: '#13192F',
    stubBg: '#111629',
    cardBorder: '#C8CFDA',
    innerBorder: 'rgba(200, 207, 218, 0.35)',
    textPrimary: '#FFFDFC',
    textSecondary: '#C8CFDA',
    textMuted: '#8B96AE',
    accent: '#E6C7BE',
    notchFill: '#FFFDFC',
    sealBg: '#2A4578',
    sealBorder: '#C8CFDA',
    sealText: '#FFFDFC',
  },
  ivory: {
    id: 'ivory',
    label: 'Giấy Kem Cổ Điển',
    photo: '/assets/photo-01.jpg',
    bg: '#FFFDFC',
    bgSecondary: '#F7F3EE',
    stubBg: '#1B2340',
    cardBorder: '#1B2340',
    innerBorder: 'rgba(42, 69, 120, 0.28)',
    textPrimary: '#1B2340',
    textSecondary: '#2F3138',
    textMuted: '#727D94',
    accent: '#2A4578',
    notchFill: '#F7F3EE',
    sealBg: '#1B2340',
    sealBorder: '#C8CFDA',
    sealText: '#FFFDFC',
  },
  blush: {
    id: 'blush',
    label: 'Hồng Phấn Nắng Mai',
    photo: '/assets/photo-07.jpg',
    bg: '#FDF7F5',
    bgSecondary: '#F6EAE6',
    stubBg: '#2A4578',
    cardBorder: '#2A4578',
    innerBorder: 'rgba(42, 69, 120, 0.24)',
    textPrimary: '#1B2340',
    textSecondary: '#3A3D4A',
    textMuted: '#7A7D8C',
    accent: '#8E5A64',
    notchFill: '#FFFDFC',
    sealBg: '#2A4578',
    sealBorder: '#E6C7BE',
    sealText: '#FFFDFC',
  },
};

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawRoundedArchPath(ctx, x, y, w, h, topRadius, bottomRadius = 12) {
  ctx.beginPath();
  ctx.moveTo(x + topRadius, y);
  ctx.lineTo(x + w - topRadius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + topRadius);
  ctx.lineTo(x + w, y + h - bottomRadius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - bottomRadius, y + h);
  ctx.lineTo(x + bottomRadius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bottomRadius);
  ctx.lineTo(x, y + topRadius);
  ctx.quadraticCurveTo(x, y, x + topRadius, y);
  ctx.closePath();
}

function drawCoverImage(ctx, img, x, y, w, h, focusY = 0.25) {
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let drawW;
  let drawH;
  let offsetX;
  let offsetY;

  if (imgRatio > boxRatio) {
    drawH = h;
    drawW = h * imgRatio;
    offsetX = x - (drawW - w) * 0.5;
    offsetY = y;
  } else {
    drawW = w;
    drawH = w / imgRatio;
    offsetX = x;
    offsetY = y - (drawH - h) * focusY;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

function drawCornerBrackets(ctx, x, y, w, h, size, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const corners = [
    [
      [x, y + size],
      [x, y],
      [x + size, y],
    ],
    [
      [x + w - size, y],
      [x + w, y],
      [x + w, y + size],
    ],
    [
      [x, y + h - size],
      [x, y + h],
      [x + size, y + h],
    ],
    [
      [x + w - size, y + h],
      [x + w, y + h],
      [x + w, y + h - size],
    ],
  ];
  corners.forEach((pts) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.lineTo(pts[1][0], pts[1][1]);
    ctx.lineTo(pts[2][0], pts[2][1]);
    ctx.stroke();
  });
}

export async function downloadKeepsakeCardPng({
  guestName,
  dedication,
  themeId = 'navy',
  config,
}) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const theme = KEEPSAKE_THEMES[themeId] || KEEPSAKE_THEMES.navy;
  const width = 1600;
  const height = 960;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const displayGuest = (guestName || '').trim() || 'Bạn thân mến';
  const displayNote =
    (dedication || '').trim() || 'Cảm ơn bạn đã là một phần thanh xuân thật đẹp.';

  // 1. Main card gradient background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, theme.bg);
  bgGrad.addColorStop(1, theme.bgSecondary);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative radial sheen
  const sheen = ctx.createRadialGradient(width * 0.22, height * 0.2, 40, width * 0.22, height * 0.2, 760);
  sheen.addColorStop(0, themeId === 'navy' ? 'rgba(230, 199, 190, 0.14)' : 'rgba(200, 207, 218, 0.24)');
  sheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);

  // 2. Right Ticket Stub panel
  const stubX = 1170;
  ctx.fillStyle = theme.stubBg;
  ctx.fillRect(stubX, 0, width - stubX, height);

  // Outer & Inner Borders
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = theme.innerBorder;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, stubX - 66, height - 84);
  drawCornerBrackets(ctx, 56, 56, stubX - 94, height - 112, 22, theme.accent);

  // Dashed ticket tear line + top/bottom circular notches
  ctx.save();
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'rgba(200, 207, 218, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(stubX, 46);
  ctx.lineTo(stubX, height - 46);
  ctx.stroke();
  ctx.restore();

  // Ticket notches (top & bottom)
  ctx.fillStyle = theme.notchFill;
  ctx.beginPath();
  ctx.arc(stubX, 0, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(stubX, height, 28, 0, Math.PI * 2);
  ctx.fill();

  // 3. Left Arched Portrait of Graduate
  const photoX = 88;
  const photoY = 104;
  const photoW = 360;
  const photoH = 540;
  const portraitImg = await loadImage(theme.photo);

  ctx.save();
  drawRoundedArchPath(ctx, photoX, photoY, photoW, photoH, 180, 14);
  ctx.clip();
  if (portraitImg) {
    drawCoverImage(ctx, portraitImg, photoX, photoY, photoW, photoH, 0.22);
  } else {
    ctx.fillStyle = '#243254';
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }
  ctx.restore();

  // Arch hairline frame
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 2.2;
  drawRoundedArchPath(ctx, photoX - 8, photoY - 8, photoW + 16, photoH + 16, 188, 18);
  ctx.stroke();

  // Caption beneath portrait
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('TÂN CỬ NHÂN · HCMIU', photoX + 6, photoY + photoH + 54);

  ctx.fillStyle = theme.textPrimary;
  ctx.font = '800 34px "Barlow Semi Condensed", sans-serif';
  ctx.fillText(config.graduate.fullName.toUpperCase(), photoX + 6, photoY + photoH + 98);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '400 17px "Barlow", sans-serif';
  ctx.fillText(config.graduate.classLabel, photoX + 6, photoY + photoH + 132);

  // 4. Center Editorial Typography & Details
  const cx = 508;
  const maxTextW = stubX - cx - 56;

  ctx.fillStyle = theme.accent;
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillText('THIỆP MỜI KỶ NIỆM LỄ TỐT NGHIỆP', cx, 134);

  ctx.fillStyle = theme.textPrimary;
  ctx.font = '800 62px "Barlow Semi Condensed", sans-serif';
  ctx.fillText('HẸN GẶP BẠN NHÉ!', cx, 214, maxTextW);

  // Hairline rule
  ctx.strokeStyle = theme.innerBorder;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, 252);
  ctx.lineTo(stubX - 56, 252);
  ctx.stroke();

  // Guest Name Highlight
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('THÂN GỬI', cx, 308);

  ctx.fillStyle = theme.textPrimary;
  ctx.font = '800 46px "Barlow Semi Condensed", sans-serif';
  ctx.fillText(displayGuest, cx, 366, maxTextW);

  // Short personal dedication
  ctx.fillStyle = theme.textSecondary;
  ctx.font = 'italic 500 21px "Barlow", sans-serif';
  ctx.fillText(`“${displayNote}”`, cx, 420, maxTextW);

  // Ceremony Details Box
  const detailY = 496;
  ctx.fillStyle = themeId === 'navy' ? 'rgba(255, 253, 252, 0.06)' : 'rgba(27, 35, 64, 0.045)';
  ctx.fillRect(cx, detailY, maxTextW, 296);
  ctx.strokeStyle = theme.innerBorder;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx, detailY, maxTextW, 296);

  const dx = cx + 28;
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('THỜI GIAN', dx, detailY + 42);

  ctx.fillStyle = theme.textPrimary;
  ctx.font = '700 24px "Barlow", sans-serif';
  ctx.fillText(`${config.ceremony.displayDateFull}  ·  ${config.ceremony.startTime}`, dx, detailY + 78, maxTextW - 56);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('ĐỊA ĐIỂM', dx, detailY + 134);

  ctx.fillStyle = theme.textPrimary;
  ctx.font = '700 22px "Barlow", sans-serif';
  ctx.fillText(config.ceremony.venueName, dx, detailY + 168, maxTextW - 56);

  ctx.fillStyle = theme.textSecondary;
  ctx.font = '400 18px "Barlow", sans-serif';
  ctx.fillText(config.ceremony.fullAddress, dx, detailY + 200, maxTextW - 56);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('LIÊN HỆ', dx, detailY + 246);

  ctx.fillStyle = theme.textSecondary;
  ctx.font = '500 18px "Barlow", sans-serif';
  ctx.fillText(config.ceremony.contactText, dx, detailY + 276, maxTextW - 56);

  // 5. Right Stub: Giant Date + Embossed Circular Seal + Barcode Motif
  const stubCenterX = stubX + (width - stubX) * 0.5;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#C8CFDA';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('ADMIT ONE · KỶ NIỆM', stubCenterX, 118);

  ctx.fillStyle = '#FFFDFC';
  ctx.font = '800 116px "Barlow Semi Condensed", sans-serif';
  ctx.fillText(config.ceremony.displayDateDay, stubCenterX, 266);

  ctx.fillStyle = '#E6C7BE';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText(config.ceremony.displayDateMonthYear, stubCenterX, 314);

  ctx.fillStyle = 'rgba(200, 207, 218, 0.78)';
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillText(config.ceremony.startTime, stubCenterX, 352);

  // Embossed circular graduation seal
  const sealY = 540;
  ctx.beginPath();
  ctx.arc(stubCenterX, sealY, 82, 0, Math.PI * 2);
  ctx.fillStyle = theme.sealBg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = theme.sealBorder;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(stubCenterX, sealY, 68, 0, Math.PI * 2);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(200, 207, 218, 0.5)';
  ctx.stroke();

  ctx.fillStyle = theme.sealText;
  ctx.font = '800 38px "Barlow Semi Condensed", sans-serif';
  ctx.fillText(config.project.monogram, stubCenterX, sealY + 4);

  ctx.fillStyle = '#C8CFDA';
  ctx.font = '500 12px "JetBrains Mono", monospace';
  ctx.fillText('CLASS OF 2026', stubCenterX, sealY + 30);

  // Decorative ticket barcode at bottom of stub
  const barY = 740;
  const barW = 240;
  const barStartX = stubCenterX - barW / 2;
  const pattern = [3, 2, 5, 2, 2, 6, 3, 2, 4, 2, 5, 3, 2, 4, 6, 2, 3, 5, 2, 3, 4, 2, 5, 2];
  let cursorX = barStartX;
  ctx.fillStyle = 'rgba(200, 207, 218, 0.72)';
  pattern.forEach((w, idx) => {
    if (idx % 2 === 0 && cursorX + w * 2 < barStartX + barW) {
      ctx.fillRect(cursorX, barY, w * 2, 64);
    }
    cursorX += w * 2.6;
  });

  ctx.fillStyle = 'rgba(200, 207, 218, 0.65)';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('29 · 11 · 2026 · HCMIU', stubCenterX, 838);

  ctx.textAlign = 'left';

  const safeSlug = displayGuest
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `thiep-ky-niem-tot-nghiep-${safeSlug || 'khach-moi'}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
