import React, { useState } from "react";
import { AvatarSelect } from "./AvatarSelect";
import { EndAndBegin } from "./EndAndBegin";
declare const chrome: any;

export function InitSelect({ onFinish }: { onFinish: () => void }) {
  const [page, setPage] = useState<"avatar" | "end">("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [userName, setUserName] = useState("");

  const handleNext = (avatar: string, name: string) => {
    setSelectedAvatar(avatar);
    setUserName(name);
    chrome.storage.local.set({ userName: name, avatar });
    setPage("end");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {page === "avatar" ? (
        <AvatarSelect onNext={handleNext} />
      ) : (
        <EndAndBegin
          avatar={selectedAvatar}
          name={userName}
          onFinish={onFinish}
        />
      )}
    </div>
  );
}
