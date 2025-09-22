import { GeneralTab } from "./main-root-contents";

export default function App({
  shadow,
  setNotification,
}: {
  shadow: any;
  setNotification: any;
}) {
  return <MainApp shadow={shadow} setNotification={setNotification} />;
}

function MainApp({
  shadow,
  setNotification,
}: {
  shadow: any;
  setNotification: any;
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
      <GeneralTab shadow={shadow} setNotification={setNotification} />
    </div>
  );
}
