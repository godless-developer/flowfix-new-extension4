import { GeneralTab } from "./main-root-contents";

export default function App({
  shadow,
  setNotification,
  allNotifs,
}: {
  shadow: any;
  setNotification: any;
  allNotifs: any[];
}) {
  return (
    <MainApp
      shadow={shadow}
      setNotification={setNotification}
      allNotifs={allNotifs}
    />
  );
}

function MainApp({
  shadow,
  setNotification,
  allNotifs,
}: {
  shadow: any;
  setNotification: any;
  allNotifs: any[];
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        color: "white",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GeneralTab
        shadow={shadow}
        setNotification={setNotification}
        allNotifs={allNotifs}
      />
    </div>
  );
}
