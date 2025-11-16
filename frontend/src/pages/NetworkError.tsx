import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type NetworkErrorPageProps = {
  errorMessage?: string;
  onRetry?: () => void;
};

const NetworkErrorPage: React.FC<NetworkErrorPageProps> = ({
  errorMessage = "Network error or server did not respond",
  onRetry,
}) => {
  const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

  const handleRetry = () => {
    navigator('/init');
     if (onRetry) {
      setLoading(true);
      Promise.resolve(onRetry()).finally(() => setLoading(false));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Oops!</h1>
        <p style={styles.message}>{errorMessage}</p>
        <button style={styles.button} onClick={handleRetry} disabled={loading}>
          {loading ? "Retrying..." : "Retry"}
        </button>
      </div>
    </div>
  );
};

// inline styles ง่าย ๆ
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    textAlign: "center",
    padding: "2rem",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#555",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default NetworkErrorPage;
