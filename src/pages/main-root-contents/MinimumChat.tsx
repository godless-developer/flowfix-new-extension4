import { Expand, X } from "lucide-react";
declare const chrome: any;

export function MinimumChat({
  setPopoverOpen,
  setDialogOpen,
}: {
  setPopoverOpen: () => void;
  setDialogOpen: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        right: "0px",
        zIndex: 9999,
        backgroundColor: "white",
        borderRadius: "24px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        padding: "8px",
        width: "360px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "8px",
          top: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "16px",
          padding: "12px",
        }}
      >
        <button
          onClick={setDialogOpen}
          style={{
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Expand strokeWidth={2.2} size={18} />
        </button>
        <button
          onClick={setPopoverOpen}
          style={{
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={24} strokeWidth={2} color="#000" />
        </button>
      </div>
      <h1>chatbot</h1>
    </div>
  );
}
