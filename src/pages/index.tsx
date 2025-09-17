import initExtension from "./RootApp";

if (window.top === window.self) {
  initExtension();
}
