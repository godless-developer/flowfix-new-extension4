import React from "react";

export default function Notif({
  user,
  shadow,
  allNotifs,
}: {
  user: any;
  shadow: any;
  allNotifs: any[];
}) {
  // 🟢 Монгол сарны нэршил
  const mongolianMonths = [
    "Нэгдүгээр сар",
    "Хоёрдугаар сар",
    "Гуравдугаар сар",
    "Дөрөвдүгээр сар",
    "Тавдугаар сар",
    "Зургадугаар сар",
    "Долдугаар сар",
    "Наймдугаар сар",
    "Есдүгээр сар",
    "Аравдугаар сар",
    "Арваннэгдүгээр сар",
    "Арванхоёрдугаар сар",
  ];

  // 🟢 Сар сараар group хийх
  const grouped = allNotifs.reduce((acc: any, notif: any) => {
    const date = new Date(notif.createdAt);
    const month = date.getMonth(); // 0–11
    const year = date.getFullYear();
    const monthYear = `${mongolianMonths[month]} ${year}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(notif);
    return acc;
  }, {});

  return (
    <div
      style={{
        color: "black",
        maxHeight: "500px",
        overflowY: "auto",
        padding: "0px 50px",
      }}
    >
      {Object.keys(grouped).map((month) => (
        <div key={month} style={{ marginBottom: "20px" }}>
          {/* 🟦 Month Header */}
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "10px",
              paddingBottom: "4px",
            }}
          >
            {month}
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {grouped[month].map((n: any, i: number) => {
              const date = new Date(n.createdAt);
              const formattedDate = date.toLocaleDateString("mn-MN", {
                day: "2-digit",
                month: "2-digit",
              });
              const formattedTime = date.toLocaleTimeString("mn-MN", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={i}
                  style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>
                      {n.title}
                    </h4>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "12px",
                        color: "#2a2929ff",
                      }}
                    >
                      {n.AdNotif}
                    </p>
                  </div>
                  <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
                    {formattedDate} {formattedTime}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
