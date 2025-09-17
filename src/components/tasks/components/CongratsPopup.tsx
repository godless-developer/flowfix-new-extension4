import { TextType } from "./TextType";

type CongratsPopupProps = {
  onClaim: () => void;
  onClose: () => void;
};
declare const chrome: any;

export function CongratsPopup({ onClaim, onClose }: CongratsPopupProps) {
  return (
    <div
      style={{
        // backgroundImage: `url(${chrome.runtime.getURL(
        //   "public/congratPopup.png"
        // )})`,
        // background: "linear-gradient(135deg, #d37bed, #7bb8feff)",
        background: "rgba(0,0,0,0.3)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "260px",
        height: "310px",
        padding: "16px 16px 15px 16px",
        borderRadius: "12px", // 🎯 radius өгч байна
        fontWeight: "bold",
        fontSize: "30px",
        fontFamily: "Inter",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        textAlign: "center",
        gap: "12px",
        position: "absolute",
        top: "130px",
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        zIndex: 10,

        // gradient border
        border: "1.5px solid rgb(164 199 243)",
      }}
    >
      <img
        src={chrome.runtime.getURL("public/congratPopup.png")}
        alt="congrat"
      />
      <div>
        🎉
        <TextType
          text={[
            "Баяр хүргэе!",
            "Unlock your new avatar 🚀",
            "Claim your reward 🏆",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          textColors={["#86599C", "#599AC2"]}
        />
        ✨
      </div>
    </div>
  );
}
