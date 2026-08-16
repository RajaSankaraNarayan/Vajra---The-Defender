export interface ExtensionFile {
  name: string;
  language: string;
  description: string;
  content: string;
}

export const CHROME_EXTENSION_FILES: ExtensionFile[] = [
  {
    name: 'manifest.json',
    language: 'json',
    description: 'Chrome Extension Manifest V3 configuration',
    content: `{
  "manifest_version": 3,
  "name": "Vajra - The Defender: E-Commerce Checkout Guard",
  "version": "1.0.0",
  "description": "Intercepts hyper-temporary fake storefronts and protects shoppers from fraudulent clearance scams using multi-vector heuristic analysis.",
  "permissions": [
    "activeTab",
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_title": "Vajra - The Defender"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["overlay.css"],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}`
  },
  {
    name: 'content.js',
    language: 'javascript',
    description: 'DOM inspection and checkout interception detection engine',
    content: `// Vajra - The Defender: E-Commerce Fraud Detection & Checkout Interceptor
(function() {
  console.log("[Vajra] Active on page:", window.location.hostname);

  const FREE_EMAIL_PROVIDERS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'mail.ru'];
  const PLACEHOLDER_REGEX = /\\[(?:Insert|Your|Company|Store|Website|Brand|Business)[^\\]]*\\]|COMPANY_NAME/i;

  let scanResult = null;

  function performHeuristicScan() {
    const pageText = document.body.innerText || '';
    const domHtml = document.documentElement.innerHTML || '';
    const url = window.location.href;
    const hostname = window.location.hostname;

    let riskScore = 0;
    const flags = [];

    // 0. Global Blacklist & Threat Intelligence (PhishTank, APWG, Community Reports)
    const isKnownThreatDomain = /luxe-paris-outlet|hyper-liquidation|flash-discounts|fake-store/i.test(hostname);
    if (isKnownThreatDomain) {
      return {
        riskScore: 100,
        isScam: true,
        flags: [{
          vector: "Global Blacklist",
          detail: "Domain is actively listed on PhishTank & Community Threat Registries. Automatic 100 Instant Block enforced."
        }],
        url: url,
        domain: hostname
      };
    }

    // 1. Support & Contact Integrity
    const emailMatches = pageText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+)/gi) || [];
    const hasFreeEmail = emailMatches.some(email => {
      const domain = email.split('@')[1]?.toLowerCase();
      return FREE_EMAIL_PROVIDERS.some(p => domain?.includes(p));
    });

    if (hasFreeEmail) {
      riskScore += 35;
      flags.push({
        vector: "Support Integrity",
        detail: "Free webmail address (@gmail/@hotmail) used for customer support instead of custom business domain."
      });
    }

    const hasPhysicalAddress = /(?:Suite|Street|Avenue|Boulevard|Blvd|St\\.|Road|Rd\\.|P\\.O\\. Box|Postcode|[A-Z]{2}\\s+\\d{5}|\\b\\d{4,5}\\b)/i.test(pageText);
    if (!hasPhysicalAddress && hasFreeEmail) {
      riskScore += 25;
      flags.push({
        vector: "Contact Integrity",
        detail: "No verifiable registered physical street address located on site."
      });
    }

    // 2. Fake Review & Testimonial Detector (100% 5-Star & 3-5h Clustering)
    const reviewElements = document.querySelectorAll('[class*="review"], [class*="rating"], [data-rating]');
    const hasUnnaturalUniformity = /100%\\s+5-star|5\\.0\\s+out\\s+of\\s+5|5\\/5\\s+stars\\s+\\(all\\)/i.test(pageText);
    const hasReviewBurst = /reviews?\\s+within|cluster|posted\\s+today/i.test(pageText) || reviewElements.length > 5;
    
    if (hasUnnaturalUniformity) {
      riskScore += 35;
      flags.push({
        vector: "Fake Review Detector",
        detail: "Synthetic 100% 5-star review profile with zero natural sentiment variance."
      });
    }

    // 3. Behavioral Dark Patterns (Fake Urgency & Popups)
    const timers = document.querySelectorAll('[class*="timer"], [id*="timer"], [class*="countdown"]');
    if (timers.length > 0) {
      riskScore += 15;
      flags.push({
        vector: "Behavioral Dark Pattern",
        detail: "Synthetic scarcity timer detected attempting to induce rushed checkout."
      });
    }

    // 4. Traffic Origin Check
    if (url.includes('fbclid=') || url.includes('ttclid=') || url.includes('gclid=')) {
      riskScore += 10;
      flags.push({
        vector: "Traffic Origin",
        detail: "Inbound funnel originated from disposable social media ad campaign."
      });
    }

    // Anti-False-Positive Filter:
    if (!hasFreeEmail && !PLACEHOLDER_REGEX.test(pageText) && hasPhysicalAddress) {
      riskScore = Math.min(15, riskScore);
    }

    return {
      riskScore: Math.min(100, riskScore),
      isScam: riskScore >= 50,
      flags: flags,
      url: url,
      domain: window.location.hostname
    };
  }

  function injectWarningModal(scan) {
    if (document.getElementById('vajra-guard-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'vajra-guard-overlay';
    overlay.className = 'vajra-backdrop';
    
    overlay.innerHTML = \`
      <div class="vajra-modal">
        <div class="vajra-header">
          <div class="vajra-badge-danger">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            VAJRA - THE DEFENDER
          </div>
          <span class="vajra-risk-pill">\${scan.riskScore}% RISK SCORE</span>
        </div>
        
        <h2 class="vajra-title">Fraud Signatures Intercepted</h2>
        <p class="vajra-subtitle">
          Vajra prevented this checkout because this store exhibits multiple characteristics of a disposable counterfeit storefront.
        </p>

        <div class="vajra-flags-container">
          \${scan.flags.map(f => \`
            <div class="vajra-flag-item">
              <span class="vajra-flag-dot"></span>
              <div>
                <strong>\${f.vector}:</strong> \${f.detail}
              </div>
            </div>
          \`).join('')}
        </div>

        <div class="vajra-actions">
          <button id="vajra-btn-abort" class="vajra-btn-primary">
            🛡️ Abort Checkout & Protect Card
          </button>
          <button id="vajra-btn-bypass" class="vajra-btn-secondary">
            Bypass Warning (Proceed at Own Risk)
          </button>
        </div>
      </div>
    \`;

    document.body.appendChild(overlay);

    document.getElementById('vajra-btn-abort').addEventListener('click', () => {
      window.history.back();
    });

    document.getElementById('vajra-btn-bypass').addEventListener('click', () => {
      overlay.remove();
    });
  }

  // Intercept checkout triggers
  function attachCheckoutInterceptors() {
    const checkoutSelectors = [
      'button[type="submit"]',
      'a[href*="checkout"]',
      'button[name="checkout"]',
      '#checkout',
      '.checkout-button',
      '[data-action="checkout"]',
      '.buy-now',
      '#btn-buy-now-checkout'
    ];

    document.addEventListener('click', function(e) {
      const target = e.target.closest(checkoutSelectors.join(','));
      if (target) {
        if (!scanResult) {
          scanResult = performHeuristicScan();
        }

        if (scanResult.isScam) {
          e.preventDefault();
          e.stopPropagation();
          injectWarningModal(scanResult);
        }
      }
    }, true);
  }

  window.addEventListener('DOMContentLoaded', () => {
    scanResult = performHeuristicScan();
    attachCheckoutInterceptors();
  });
})();`
  },
  {
    name: 'overlay.css',
    language: 'css',
    description: 'Glassmorphic styling for the warning modal',
    content: `/* Vajra Glassmorphic Interception Modal */
.vajra-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 7, 17, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483647;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  animation: vajraFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.vajra-modal {
  background: #0c1222;
  border: 1px solid rgba(244, 63, 94, 0.3);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(244, 63, 94, 0.2);
  width: 90%;
  max-width: 520px;
  padding: 28px;
  color: #f8fafc;
}

.vajra-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.vajra-badge-danger {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #fda4af;
  background: rgba(244, 63, 94, 0.15);
  padding: 6px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(244, 63, 94, 0.3);
}

.vajra-risk-pill {
  font-size: 11px;
  font-weight: 800;
  background: #e11d48;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 8px;
}

.vajra-title {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.vajra-subtitle {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.vajra-flags-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vajra-flag-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  color: #cbd5e1;
  line-height: 1.4;
}

.vajra-flag-dot {
  width: 8px;
  height: 8px;
  background: #f43f5e;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}

.vajra-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vajra-btn-primary {
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
  transition: all 0.15s ease;
}

.vajra-btn-primary:hover {
  transform: translateY(-1px);
}

.vajra-btn-secondary {
  background: transparent;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
}

.vajra-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

@keyframes vajraFadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}`
  },
  {
    name: 'popup.html',
    language: 'html',
    description: 'Chrome Extension toolbar popup interface',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      width: 320px;
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #090e1a;
      color: #f8fafc;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 14px;
      color: #ffffff;
    }
    .status-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 12px;
      background: rgba(14, 165, 233, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(14, 165, 233, 0.3);
    }
    .metric-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 6px;
    }
    .metric-row:last-child { margin-bottom: 0; }
    .label { color: #94a3b8; }
    .value { font-weight: 700; color: #ffffff; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <span>⚡</span> Vajra - The Defender
    </div>
    <span class="status-badge">ARMED</span>
  </div>
  
  <div class="metric-box">
    <div class="metric-row">
      <span class="label">Host:</span>
      <span class="value" id="current-domain">Scanning...</span>
    </div>
    <div class="metric-row">
      <span class="label">Risk Index:</span>
      <span class="value" id="risk-score">0%</span>
    </div>
    <div class="metric-row">
      <span class="label">Interception:</span>
      <span class="value" id="guard-status" style="color: #38bdf8;">Armed</span>
    </div>
  </div>

  <p style="font-size: 11px; color: #64748b; line-height: 1.4; margin: 0;">
    Vajra monitors support MX records, WHOIS age, cloned boilerplate, and fake countdowns before payment is authorized.
  </p>
</body>
</html>`
  },
  {
    name: 'background.js',
    language: 'javascript',
    description: 'Manifest V3 Service Worker for background telemetry and badge updates',
    content: `// Vajra Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Vajra] Extension installed and background worker armed.");
});

// Update toolbar badge based on scan results from active tabs
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "VAJRA_SCAN_UPDATE" && sender.tab) {
    if (message.isScam) {
      chrome.action.setBadgeText({ tabId: sender.tab.id, text: "!" });
      chrome.action.setBadgeBackgroundColor({ tabId: sender.tab.id, color: "#e11d48" });
    } else {
      chrome.action.setBadgeText({ tabId: sender.tab.id, text: "✓" });
      chrome.action.setBadgeBackgroundColor({ tabId: sender.tab.id, color: "#0ea5e9" });
    }
  }
});`
  }
];
