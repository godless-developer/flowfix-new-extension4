import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Popover, Trigger, InitSelect, AuthPage } from "./main-root-contents";
import { createShadowHost, initToast } from "./utils";
import App from "./App";
import { Providers } from "@/provider/queryClientProvider";
import { X } from "lucide-react";
import { Intro } from "./main-root-contents/Intro/Intro";
import { AuthProvider, useAuth } from "@/api/login-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

declare const chrome: any;

const theme = createTheme({
  typography: {
    fontFamily: "SF Pro",
  },
});

export default function initExtension() {
  const { shadow, appContainer } = createShadowHost();
  initToast(shadow);

  const RootAppInner = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState<any | null>(null);
    console.log("rootapp notif", notification);
    const [step, setStep] = useState<
      "intro" | "login" | "chooseName" | "main" | "trigger"
    >("intro");

    useEffect(() => {
      (async () => {
        const logged = await chrome.storage.local.get(["isLoggedIn"]);
        if (logged.isLoggedIn) {
          setIsLoggedIn(true);
          setStep("main");
        }
      })();
    }, []);

    const shuudLogin = async () => {
      setIsLoggedIn(true);
      setStep("chooseName");
    };

    const { loginWithGoogle } = useAuth();
    const handleLogin = async () => {
      try {
        await loginWithGoogle();
        setIsLoggedIn(true);
        setStep("chooseName");
      } catch (e: any) {
        console.error("Login failed:", e?.message || e);
        alert(e?.message || "Login failed");
      }
    };

    return (
      <Providers>
        {(step === "intro" ||
          step === "login" ||
          step === "chooseName" ||
          step === "main") && (
          <Popover
            width={900}
            height={600}
            show={!((step as string) === "trigger")}
            x={
              step === "main" ? (
                <div
                  style={{
                    position: "absolute",
                    top: 32,
                    right: 32,
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 7,
                  }}
                  onClick={() => setStep("trigger")}
                >
                  <X size={30} color="#000" />
                </div>
              ) : null
            }
          >
            {step === "intro" && <Intro onFinish={() => setStep("login")} />}
            {step === "login" && (
              <AuthPage onLogin={handleLogin} shuudLogin={shuudLogin} />
            )}
            {step === "chooseName" && (
              <InitSelect onFinish={() => setStep("trigger")} />
            )}
            {step === "main" && (
              <App shadow={shadow} setNotification={setNotification} />
            )}
          </Popover>
        )}

        {step === "trigger" && (
          <Trigger
            onClick={() => setStep("main")}
            notification={notification}
          />
        )}
      </Providers>
    );
  };

  const RootApp = () => (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RootAppInner />
      </ThemeProvider>
    </AuthProvider>
  );

  createRoot(appContainer).render(<RootApp />);
}
