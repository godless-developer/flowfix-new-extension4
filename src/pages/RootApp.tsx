// initExtension.tsx
declare const chrome: any;

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Popover, Trigger, InitSelect, AuthPage } from "./main-root-contents";
import { createShadowHost, initToast } from "./utils";
import App from "./App";
import { Providers } from "@/provider/queryClientProvider";
import { X } from "lucide-react";
import { Intro } from "./main-root-contents/Intro/Intro";

export default function initExtension() {
  const { shadow, appContainer } = createShadowHost();
  initToast(shadow);

  const RootApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [step, setStep] = useState<
      "intro" | "login" | "chooseName" | "main" | "trigger"
    >("intro");

    // check login
    useEffect(() => {
      (async () => {
        const logged = await chrome.storage.local.get(["isLoggedIn"]);
        if (logged.isLoggedIn) {
          setIsLoggedIn(true);
          setStep("main");
        }
      })();
    }, []);

    const handleTriggerClick = () => {
      if (!isLoggedIn) setStep("intro");
      else setStep("main");
    };

    const shuudLogin = async () => {
      setIsLoggedIn(true);
      setStep("chooseName");
    };

    const handleLogin = async () => {
      chrome.runtime.sendMessage(
        { action: "login_google" },
        (response: any) => {
          console.log("login response", response);
          if (response && response.success) {
            setIsLoggedIn(true);
            (shadow as any).showToast("Please refresh page!", {
              title: "Successfully login!",
              type: "success",
              duration: 5000,
            });
          } else {
            (shadow as any).showToast(response?.error || "Please try again", {
              title: "Login failed!",
              type: "error",
              duration: 5000,
            });
          }
        }
      );
    };

    return (
      <Providers>
        {step === "intro" && (
          <Popover width={900} height={600}>
            <Intro onFinish={() => setStep("login")} />
          </Popover>
        )}

        {step === "login" && (
          <Popover width={900} height={600}>
            <AuthPage onLogin={handleLogin} shuudLogin={shuudLogin} />
          </Popover>
        )}

        {step === "chooseName" && (
          <Popover width={900} height={600}>
            <InitSelect onFinish={() => setStep("trigger")} />
          </Popover>
        )}

        {step === "main" && (
          <Popover
            width={900}
            height={600}
            x={
              <div
                style={{
                  position: "absolute",
                  top: 32,
                  right: 32,
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 7,
                }}
                onClick={() => setStep("trigger")}
              >
                <X size={30} color="#9747FF" />
              </div>
            }
          >
            <App shadow={shadow} />
          </Popover>
        )}
        {step === "trigger" && <Trigger onClick={() => setStep("main")} />}
      </Providers>
    );
  };

  createRoot(appContainer).render(<RootApp />);
}
