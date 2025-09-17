declare const chrome: any;
export function createShadowHost() {
  const host = document.createElement("div");
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  const appContainer = document.createElement("div");
  shadow.appendChild(appContainer);

  // global style
  //   const style = document.createElement("style");
  //   style.textContent = `
  //    @font-face {
  //   font-family: 'Inter';
  //   font-style: normal;
  //   font-weight: 400;
  //   src: url('${chrome.runtime.getURL("fonts/SF-Pro.dmg")}') format('dmg');
  // }

  //     * {
  //       font-family: 'SF Pro', sans-serif !important;
  //     }

  //     p {
  //       line-height: 1.5;
  //     }
  //   `;
  //   shadow.appendChild(style);

  return { shadow, appContainer };
}
