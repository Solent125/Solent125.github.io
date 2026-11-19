/* ===================================
   SOLENT CONSULTANCY — Google Analytics 4 + cookie consent
   Measurement ID: G-BKKZ45VQV9
   Loaded in <head> of every page. Analytics cookies are only set
   after the visitor clicks "Accept analytics" (Consent Mode v2).
   =================================== */

(function () {
  var GA_ID = 'G-BKKZ45VQV9';
  var KEY = 'solent_cookie_consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: stored === 'granted' ? 'granted' : 'denied'
  });
  gtag('js', new Date());
  gtag('config', GA_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  var css =
    '#solent-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
    'max-width:640px;margin:0 auto;padding:20px 24px;background:#2d3348;color:#fff;' +
    'border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.25);' +
    "font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.5;display:none}" +
    '#solent-cookie-banner p{margin:0 0 14px}' +
    '#solent-cookie-banner a{color:#bfd8d5;text-decoration:underline}' +
    '#solent-cookie-banner .scb-buttons{display:flex;gap:10px;flex-wrap:wrap}' +
    '#solent-cookie-banner button{font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;' +
    'padding:10px 22px;border-radius:8px;border:2px solid #bfd8d5}' +
    '#solent-cookie-banner .scb-accept{background:#bfd8d5;color:#2d3348}' +
    '#solent-cookie-banner .scb-reject{background:transparent;color:#bfd8d5}';

  document.addEventListener('DOMContentLoaded', function () {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'solent-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie preferences');
    banner.innerHTML =
      '<p>We use analytics cookies to understand how visitors use our website so we can improve it. ' +
      'They are only set if you accept. <a href="privacy.html">Privacy &amp; cookies</a></p>' +
      '<div class="scb-buttons">' +
      '<button type="button" class="scb-accept">Accept analytics</button>' +
      '<button type="button" class="scb-reject">Reject</button>' +
      '</div>';
    document.body.appendChild(banner);

    function save(choice) {
      try { localStorage.setItem(KEY, choice); } catch (e) {}
      gtag('consent', 'update', { analytics_storage: choice });
      banner.style.display = 'none';
    }
    banner.querySelector('.scb-accept').onclick = function () { save('granted'); };
    banner.querySelector('.scb-reject').onclick = function () { save('denied'); };

    if (stored !== 'granted' && stored !== 'denied') banner.style.display = 'block';

    window.solentCookieSettings = function () { banner.style.display = 'block'; };

    // Add "Privacy & cookies · Cookie settings" to the footer of every page
    var footer = document.querySelector('footer');
    if (footer) {
      var line = document.createElement('div');
      line.innerHTML =
        '<a href="privacy.html">Privacy &amp; cookies</a> &nbsp;·&nbsp; ' +
        '<a href="#" id="cookie-settings-link">Cookie settings</a>';
      footer.appendChild(line);
      document.getElementById('cookie-settings-link').onclick = function (e) {
        e.preventDefault();
        window.solentCookieSettings();
      };
    }

    // Count contact form submissions as a lead in GA.
    // Wait (max 1 second) for the event to be sent before leaving the page.
    var form = document.querySelector('form[action*="formspree"]');
    if (form) {
      form.addEventListener('submit', function (e) {
        if (form.dataset.sent) return;
        e.preventDefault();
        var done = false;
        function go() { if (done) return; done = true; form.dataset.sent = '1'; form.submit(); }
        gtag('event', 'generate_lead', {
          form_name: 'contact',
          transport_type: 'beacon',
          event_callback: go,
          event_timeout: 1000
        });
        setTimeout(go, 1200);
      });
    }

    // Count clicks on Solent's phone, WhatsApp, email and social links
    // (clicks on clients' own contacts in testimonials are not counted)
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || a.closest('.testimonial')) return;
      var href = a.getAttribute('href') || '';
      var name = null, params = { link_url: href, page: location.pathname };
      if (/^tel:/i.test(href)) name = 'click_phone';
      else if (/wa\.me\/|api\.whatsapp\.com/i.test(href)) name = 'click_whatsapp';
      else if (/^mailto:info@solentconsultancy\.com/i.test(href)) name = 'click_email';
      else if (/instagram\.com|facebook\.com/i.test(href)) {
        name = 'click_social';
        params.network = /instagram/i.test(href) ? 'instagram' : 'facebook';
      }
      if (name) {
        params.transport_type = 'beacon';
        gtag('event', name, params);
      }
    }, true);
  });
})();
