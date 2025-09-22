import { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { motion, AnimatePresence } from "framer-motion";

export function AuthPage({
  onLogin,
  shuudLogin,
}: {
  onLogin: () => void;
  shuudLogin: () => void;
}) {
  const [page, setPage] = useState<"signin" | "signup">("signin");

  const animationProps2 = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.3 },
  };
  const animationProps1 = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.3 },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "black",
        textAlign: "center",
        gap: 12,
      }}
    >
      <AnimatePresence mode="wait">
        {page === "signin" ? (
          <motion.div
            key="login"
            {...animationProps1}
            style={{ padding: "50px" }}
          >
            <Login
              onLogin={onLogin}
              shuudLogin={shuudLogin}
              pageswitch={() => setPage("signup")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            {...animationProps2}
            style={{ padding: "50px" }}
          >
            <Signup onswitch={() => setPage("signin")} />
          </motion.div>
        )}
      </AnimatePresence>
      <p
        style={{
          fontSize: "11px",
          color: "#666666ff",
          fontWeight: "bold",
          marginTop: "50px",
          whiteSpace: "pre-line",
          position: "absolute",
          left: "34%",
          bottom: "25px",
        }}
      >
        Powered by FlowFix {"\n"}Copyright © 2025 FlowFix. All rights reserved.
      </p>
    </div>
  );
}
