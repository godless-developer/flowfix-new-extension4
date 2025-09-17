import { GeneralTab } from "./main-root-contents";

export default function App({ shadow }: { shadow: any }) {
  return <MainApp shadow={shadow} />;
}

function MainApp({ shadow }: { shadow: any }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "590px",
        width: "890px",
        color: "white",
        borderRadius: "16px",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <GeneralTab shadow={shadow} />
    </div>
  );
}
