/**
 * Safely extracts and sanitizes an optional guest name from the URL
 * (e.g., ?to=Alex or ?guest=Minh). Never exposes private lists.
 */
export function getSanitizedRecipientName() {
  if (typeof window === 'undefined') return '';
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('to') || params.get('guest') || '';
    const cleaned = raw
      .replace(/[<>"'`\\/{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 40);
    return cleaned;
  } catch {
    return '';
  }
}

export function hasSeenPreludeThisSession() {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem('tlc_prelude_opened') === '1';
  } catch {
    return false;
  }
}

export function markPreludeSeenThisSession() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem('tlc_prelude_opened', '1');
  } catch {
    // Ignore storage restriction
  }
}
