import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Popover, Trigger, InitSelect, AuthPage } from "./main-root-contents";
import { createShadowHost, initToast } from "./utils";
import App from "./App";
import { Providers } from "@/provider/queryClientProvider";
import { X, Shrink } from "lucide-react";
import { Intro } from "./main-root-contents/Intro/Intro";
import { AuthProvider, useAuth } from "@/api/login-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import axios from "axios";

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
    const [allNotifs, setAllNotifs] = useState<any[]>([]); // ⬅️ бүх notification хадгалах state
    const [step, setStep] = useState<
      "intro" | "login" | "chooseName" | "main" | "trigger" | "mini"
    >("intro");

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    // 🔥 Login with username
    const userNameLogin = async (name: string, password: string) => {
      try {
        const res = await api.post("/users/login", { name, password });
        if (res.status === 200) {
          const { user } = res.data;

          await chrome.storage.local.set({
            user,
            isLoggedIn: true,
          });

          setIsLoggedIn(true);
          setStep("chooseName");
        }
      } catch (e: any) {
        console.error("Username login failed:", e);
        alert(
          e?.response?.data?.message || "Username эсвэл password буруу байна"
        );
      }
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

    // 🔥 All notifications fetch
    const fetchAllNotifs = async () => {
      try {
        const res = await api.get("/notif/all");
        if (res.status === 200) {
          setAllNotifs(res.data); // ⬅️ backend-ээс ирсэн бүх notification-ууд
        }
      } catch (e) {
        console.error("Fetch all notifications failed:", e);
      }
    };

    useEffect(() => {
      (async () => {
        const logged = await chrome.storage.local.get(["isLoggedIn"]);
        if (logged.isLoggedIn) {
          setIsLoggedIn(true);
          setStep("main");
          fetchAllNotifs(); // ⬅️ login болсон үед бүх notif дуудах
        }
      })();
    }, []);

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
                    right: 64,
                    borderRadius: "50%",
                    gap: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 7,
                  }}
                  onClick={() => setStep("trigger")}
                >
                  <Shrink size={26} color="#000" />
                  <X size={28} color="#000" />
                </div>
              ) : null
            }
          >
            {step === "intro" && <Intro onFinish={() => setStep("login")} />}
            {step === "login" && (
              <AuthPage onLogin={handleLogin} userNameLogin={userNameLogin} />
            )}
            {step === "chooseName" && (
              <InitSelect onFinish={() => setStep("trigger")} />
            )}
            {step === "main" && (
              <App
                shadow={shadow}
                setNotification={setNotification}
                allNotifs={allNotifs} // ⬅️ App руу prop-оор дамжуулж байна
              />
            )}
          </Popover>
        )}

        {step === "trigger" && <Trigger onClick={() => setStep("main")} />}
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
