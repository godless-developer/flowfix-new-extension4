"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FeedbackSelect,
  MyFeedback,
  NameAndAnon,
  TextAreaButton,
} from "./components";
import {
  createFeedback,
  getFeedbackByUserId,
  getFeedbackCategories,
} from "@/api/feedback-context";

type FeedbackProps = {
  user?: any;
  shadow: {
    showToast: (
      message: string,
      opts: { title?: string; type?: "success" | "error"; duration?: number }
    ) => void;
  };
};

export function Feedback({ user, shadow }: FeedbackProps) {
  const [anon, setAnon] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [myFeedbacks, setMyFeedbacks] = useState<any[]>([]);
  const [viewMyFeedbacks, setViewMyFeedbacks] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getFeedbackCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };

    const fetchMyFeedbacks = async () => {
      try {
        const data = await getFeedbackByUserId(user._id);
        setMyFeedbacks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyFeedbacks();
    fetchCats();
  }, [user._id]);

  const options = categories.map((cat: any) => ({
    value: cat._id,
    label: cat.categoryName,
  }));

  const SubmitFeedback = async () => {
    if (!text.trim()) {
      shadow.showToast("Санал хүсэлт хоосон байна!", {
        title: "Error",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      await createFeedback({
        userId: user._id,
        question: text,
        categoryId: selectedCats,
        unknown: anon,
      });

      const updated = await getFeedbackByUserId(user._id);
      setMyFeedbacks(updated);

      shadow.showToast("", {
        title: "Амжилттай илгээгдлээ!",
        type: "success",
        duration: 3000,
      });

      setText("");
      setSelectedCats([]);
    } catch (err: any) {
      shadow.showToast(err.message || "Network error", {
        title: "Хүсэлт амжилтгүй!",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewMyFeedbacks = () => {
    setDirection(1);
    setViewMyFeedbacks(true);
  };

  const handleBack = () => {
    setDirection(-1);
    setViewMyFeedbacks(false);
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: number) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        color: "#e6e6e6",
        borderRadius: 16,
      }}
    >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {!viewMyFeedbacks ? (
          <motion.div
            key="submit"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <NameAndAnon
              name={user.first_name}
              avatarUrl={user.profile_img}
              anon={anon}
              toggle={() => setAnon((v) => !v)}
            />
            <FeedbackSelect
              options={options}
              value={selectedCats}
              onChange={(vals) => setSelectedCats(vals)}
            />
            <TextAreaButton
              text={text}
              setText={setText}
              disabled={loading}
              loading={loading}
              anon={anon}
              onSubmit={SubmitFeedback}
              selectedCats={selectedCats}
              handleViewMyFeedbacks={handleViewMyFeedbacks}
            />
          </motion.div>
        ) : (
          <MyFeedback
            myFeedbacks={myFeedbacks}
            direction={direction}
            variants={variants}
            handleBack={handleBack}
            setMyFeedbacks={setMyFeedbacks}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
