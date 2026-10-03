// ═══════════════════════════════════════════════════════════════
// Bot detection for the GAS logging endpoints (/api/wa, /api/track).
//
// Bots still get the normal response (302 to WhatsApp / 1x1 GIF); they are
// only kept out of the Google Sheet used by CS and for Google Ads offline
// conversions. Patterns are explicit product names on purpose: a generic
// "bot" would also match real phone user agents such as "CUBOT".
// ═══════════════════════════════════════════════════════════════

const BOT_USER_AGENT_PATTERN = new RegExp(
  [
    // Search engines
    'googlebot', 'google-inspectiontool', 'googleother', 'adsbot-google', 'mediapartners-google',
    'bingbot', 'bingpreview', 'yandexbot', 'duckduckbot', 'slurp', 'baiduspider', 'applebot', 'petalbot',
    // Social / archive previews
    'facebot', 'facebookexternalhit', 'meta-webindexer', 'ia_archiver',
    // AI crawlers and fetchers
    'gptbot', 'oai-searchbot', 'chatgpt-user', 'claudebot', 'claude-searchbot', 'perplexitybot', 'bytespider',
    // SEO tools
    'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot',
    // Speed tests and automated browsers (PageSpeed Insights, Lighthouse, headless QA)
    'chrome-lighthouse', 'headlesschrome', 'pagespeed', 'gtmetrix', 'pingdom',
    // Generic self-declared crawlers
    'crawler', 'spider',
  ].join('|'),
  'i'
);

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  return BOT_USER_AGENT_PATTERN.test(userAgent || '');
}
