chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "START_GOOGLE_OAUTH") {
    const { clientId, scopes, state, nonce } = message.payload;

    const extensionId = chrome.runtime.id;
    const redirectUri = `https://${extensionId}.chromiumapp.org/`;

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("response_type", "token id_token");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes.join(" "));
    authUrl.searchParams.set("include_granted_scopes", "true");
    authUrl.searchParams.set("prompt", "select_account");
    if (state) authUrl.searchParams.set("state", state);
    if (nonce) authUrl.searchParams.set("nonce", nonce);

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl.toString(),
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError) {
          sendResponse({ ok: false, error: chrome.runtime.lastError.message });
          return;
        }
        if (!redirectUrl) {
          sendResponse({ ok: false, error: "No redirect URL returned" });
          return;
        }
        sendResponse({ ok: true, redirectUrl });
      }
    );

    return true;
  }
});
