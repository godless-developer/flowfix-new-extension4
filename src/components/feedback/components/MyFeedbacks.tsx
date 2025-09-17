import { deleteFeedback } from "@/api/feedback-context";
import { motion } from "framer-motion";
import { ArrowUpCircleIcon, Trash2 } from "lucide-react";

interface MyFeedbackProps {
  myFeedbacks: any[];
  direction: any;
  variants: any;
  handleBack: () => void;
  setMyFeedbacks: any;
}

export function MyFeedback({
  myFeedbacks,
  direction,
  variants,
  setMyFeedbacks,
  handleBack,
}: MyFeedbackProps) {
  return (
    <motion.div
      key="myFeedbacks"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      style={styles.container}
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        style={styles.backButton}
        onClick={handleBack}
      >
        <ArrowUpCircleIcon size={20} />
        <span>Буцах</span>
      </motion.button>

      {myFeedbacks.filter((fb) => !fb.unknown).length === 0 ? (
        <p style={styles.noFeedback}>Санал хүсэлт байхгүй байна</p>
      ) : (
        <div style={styles.list}>
          {myFeedbacks
            .filter((fb) => !fb.unknown)
            .map((fb) => (
              <motion.div key={fb._id} style={styles.card}>
                <div style={styles.left}>
                  <p style={styles.question}>{fb.question}</p>
                  <span style={styles.date}>
                    {new Date(fb.createdAt).toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={styles.categories}>
                    {fb.categoryId.map((cat: any) => (
                      <span key={cat._id} style={styles.category}>
                        {cat.categoryName}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, color: "#ff4d4f" }}
                    whileTap={{ scale: 0.95 }}
                    style={styles.deleteBtn}
                    onClick={async () => {
                      try {
                        await deleteFeedback(fb._id);
                        setMyFeedbacks((prev: any) =>
                          prev.filter((f: any) => f._id !== fb._id)
                        );
                      } catch (err: any) {
                        console.error(err);
                      }
                    }}
                  >
                    <Trash2 />
                  </motion.button>
                  {/* <button
                    style={styles.deleteBtn}
                    onClick={async () => {
                      try {
                        await deleteFeedback(fb._id);
                        setMyFeedbacks((prev: any) =>
                          prev.filter((f: any) => f._id !== fb._id)
                        );
                      } catch (err: any) {
                        console.error(err);
                      }
                    }}
                  >
                    <Trash2 />
                  </button> */}
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </motion.div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  backButton: {
    marginBottom: 12,
    padding: "6px 12px",
    background: "linear-gradient(135deg, #0bbbf5ff, #e944efff)",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    color: "#fff",
    fontWeight: 600,
    alignSelf: "flex-start",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
  },
  noFeedback: {
    color: "#aaa",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: "450px",
    overflowY: "auto",
    overflowX: "hidden",
    paddingRight: 6,
    scrollbarWidth: "thin", // Firefox-д scrollbar-ыг нуух
    msOverflowStyle: "none",
  } as React.CSSProperties,

  card: {
    padding: 14,
    borderRadius: 12,
    border: "1px solid #2d2d2d",
    display: "flex",
    flexDirection: "row", // хөндлөн чиглэл
    justifyContent: "space-between", // хоёр талд байрлуулна
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "rgba(60,60,60,0.6)",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "70%",
  },
  question: {
    fontSize: 15,
    margin: 0,
    fontWeight: 500,
    color: "#fff",
    wordWrap: "break-word",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
  },
  categories: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  category: {
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 12,
    background: "linear-gradient(135deg,  #0bbbf5ff, #e944efff)",
    color: "white",
  },
  badge: {
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 12,
    width: "fit-content",
    fontWeight: 500,
  },
  deleteBtn: {
    padding: "4px 10px",
    background: "none",
    borderRadius: 6,
    color: "#ccbebeff",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
    alignSelf: "flex-center",
  },
};
