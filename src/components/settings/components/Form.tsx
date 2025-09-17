interface FormProps {
  onChange: (key: string, value: string) => void;
  formData: any;
}
export function Form({ onChange, formData }: FormProps) {
  return (
    <div style={styles.form}>
      {[
        { key: "first_name", label: "Овог" },
        { key: "last_name", label: "Нэр" },
        { key: "email", label: "Имэйл" },
        { key: "phone_number", label: "Утасны дугаар" },
        { key: "gender", label: "Хүйс" },
        { key: "address", label: "Хаяг" },
      ].map((field) => (
        <div key={field.key} style={styles.field}>
          <label style={styles.label}>{field.label}</label>

          {field.key === "gender" ? (
            <div style={{ display: "flex", gap: "10px" }}>
              {["Эр", "Эм"].map((opt) => {
                const isActive = formData.gender === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChange("gender", opt)}
                    style={{
                      flex: "1 1 50%",
                      minWidth: "100px",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: `1px solid ${isActive ? "#4f8cff" : "#2a2f3a"}`,
                      background: isActive ? "#1a2233" : "#0c111b",
                      color: "#e6e6e6",
                      textAlign: "center",
                      cursor: "pointer",
                      fontFamily: "Inter",
                      position: "relative",
                    }}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        ✔
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              value={formData[field.key as keyof typeof formData] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              style={styles.input}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "12px",
    color: "#aaa",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#0c111b",
    color: "#fff",
    fontFamily: "Inter",
    outline: "none",
  },
};
