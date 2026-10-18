(function () {
  'use strict';

  const endpoint = 'https://firestore.googleapis.com/v1/projects/poketquest-3a73d/databases/(default)/documents/publicSiteStatus/tiktokLive';
  const directLiveUrl = 'https://www.tiktok.com/@yuji.shimizu2/live';
  const selector = 'a[href*="tiktok.com/@yuji.shimizu2"]';
  const pollMilliseconds = 45000;
  const maximumAgeMilliseconds = 4 * 60 * 60 * 1000;

  function links() {
    return Array.from(document.querySelectorAll(selector));
  }

  function apply(isLive, liveUrl) {
    document.documentElement.classList.toggle('yuji-is-live', isLive);
    links().forEach(function (link) {
      if (!link.dataset.liveOriginalHref) link.dataset.liveOriginalHref = link.href;
      if (!link.dataset.liveOriginalHtml) link.dataset.liveOriginalHtml = link.innerHTML;
      link.classList.toggle('tiktok-live-now', isLive);
      if (isLive) {
        link.href = liveUrl || directLiveUrl;
        link.setAttribute('aria-label', 'Yuji is live on TikTok now. Watch the live stream.');
        link.innerHTML = '<span class="live-dot" aria-hidden="true"></span><span>LIVE NOW</span><strong>Watch Yuji ↗</strong>';
      } else {
        link.href = link.dataset.liveOriginalHref;
        link.innerHTML = link.dataset.liveOriginalHtml;
        link.removeAttribute('aria-label');
      }
    });
  }

  function value(fields, name, kind) {
    return fields && fields[name] && fields[name][kind];
  }

  async function refresh() {
    try {
      const response = await fetch(endpoint + '?cacheBust=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) throw new Error('Live status unavailable');
      const payload = await response.json();
      const fields = payload.fields || {};
      const startedAt = Date.parse(value(fields, 'startedAt', 'timestampValue') || '');
      const expiresAt = Date.parse(value(fields, 'expiresAt', 'timestampValue') || '');
      const fresh = Number.isFinite(expiresAt)
        ? expiresAt > Date.now()
        : Number.isFinite(startedAt) && Date.now() - startedAt < maximumAgeMilliseconds;
      apply(value(fields, 'isLive', 'booleanValue') === true && fresh,
        value(fields, 'liveUrl', 'stringValue') || directLiveUrl);
    } catch (_) {
      apply(false, directLiveUrl);
    }
  }

  refresh();
  window.setInterval(refresh, pollMilliseconds);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) refresh();
  });
}());
