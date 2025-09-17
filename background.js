// background.js
/* global chrome */
const GOOGLE_CLIENT_ID =
  "345688677648-3uqtu41h0ibfodovq46j76qv00df906a.apps.googleusercontent.com"; // from Google Cloud Console
const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const BACKEND_TOKEN_EXCHANGE = "http://localhost:4000/auth/google"; // see backend section

// --- PKCE helpers ---
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier() {
  // 128 chars
  const array = new Uint8Array(96);
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hash);
}

function base64UrlEncode(arr) {
  // convert bytes to base64url
  let str = btoa(String.fromCharCode(...arr));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createCodeChallenge(code_verifier) {
  const hashed = await sha256(code_verifier);
  return base64UrlEncode(hashed);
}

// --- Message listener ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "login_google") {
    (async () => {
      try {
        const code_verifier = generateCodeVerifier();
        const code_challenge = await createCodeChallenge(code_verifier);

        // store verifier temporarily (in chrome.storage.local)
        await new Promise((res) =>
          chrome.storage.local.set({ google_code_verifier: code_verifier }, res)
        );

        const redirectUri =
          chrome.identity.getRedirectURL() ||
          "https://icbejbhajbmaccikaipiicjkclpppnoc.chromiumapp.org"; // must be registered in Google Cloud OAuth client
        console.log(redirectUri);
        const authUrl =
          `${GOOGLE_AUTH_ENDPOINT}` +
          `?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
          `&response_type=code` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&scope=${encodeURIComponent("openid email profile")}` +
          `&access_type=offline` + // request refresh token
          `&prompt=consent` + // force consent to get refresh_token first time
          `&code_challenge=${encodeURIComponent(code_challenge)}` +
          `&code_challenge_method=S256`;

        if (!chrome.identity || !chrome.identity.launchWebAuthFlow) {
          sendResponse({ success: false, error: "Identity API not available" });
          return;
        }

        chrome.identity.launchWebAuthFlow(
          { url: authUrl, interactive: true },
          async (redirectUrl) => {
            if (chrome.runtime.lastError) {
              sendResponse({
                success: false,
                error: chrome.runtime.lastError.message,
              });
              return;
            }

            if (!redirectUrl) {
              sendResponse({ success: false, error: "No redirect URL" });
              return;
            }

            try {
              const url = new URL(redirectUrl);
              const err = url.searchParams.get("error");
              if (err) {
                sendResponse({ success: false, error: err });
                return;
              }
              const code = url.searchParams.get("code");
              if (!code) {
                sendResponse({ success: false, error: "No code in redirect" });
                return;
              }

              // read code_verifier from storage
              const stored = await new Promise((res) =>
                chrome.storage.local.get(["google_code_verifier"], res)
              );

              const code_verifier_stored = stored.google_code_verifier || "";

              // send code + verifier to backend to exchange for tokens + create session
              fetch(BACKEND_TOKEN_EXCHANGE, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // If your backend requires an Authorization header (like previous flow),
                  // add it here. Otherwise omit.
                },
                body: JSON.stringify({
                  code,
                  code_verifier: code_verifier_stored,
                  isWeb: false,
                }),
              })
                .then((r) => r.json())
                .then((data) => {
                  if (data.sessionToken) {
                    // store session info locally
                    chrome.storage.local.set(
                      {
                        isLoggedIn: true,
                        sessionToken: data.sessionToken,
                        access_token: data.access_token || "",
                        email: data.user?.email || "",
                      },
                      () => {
                        // optionally reload tab that initiated login
                        if (sender.tab && sender.tab.id) {
                          chrome.scripting.executeScript({
                            target: { tabId: sender.tab.id },
                            func: () => window.location.reload(),
                          });
                        }
                        sendResponse({
                          success: true,
                          code: code.substring(0, 10) + "...",
                        });
                      }
                    );
                  } else {
                    sendResponse({
                      success: false,
                      error: data.error || "No session token",
                    });
                  }
                })
                .catch((err) => {
                  sendResponse({ success: false, error: err.message });
                });
            } catch (e) {
              sendResponse({ success: false, error: e.message });
            }
          }
        );

        // return true to indicate we will call sendResponse asynchronously
        return true;
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();

    // indicate async response (will be completed in launchWebAuthFlow callback)
    return true;
  }
});
