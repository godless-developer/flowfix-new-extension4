declare const chrome: any;

export function SettingsView({ user }: { user: any }) {
  return (
    <div style={styles.container}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <p>{user.buddyName}</p>
      <p>{user.buddyUrl}</p>
      <p>{user.googleId}</p>
      <p>{user.profile}</p>
      <p>{user.status}</p>
      <button>Хадгалах</button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    color: "black",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
