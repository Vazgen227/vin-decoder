import { useState } from "react";
import { decodeVIN } from "../utils/api";
import VinResults from "../components/VinResults";
import VinHistory from "../components/VinHistory";
import { validateVin } from "../utils/validation";
import styles from "../styles/HomePage.module.css";
function HomePage() {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistori] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleDecode(customVin) {
    const vinToUse = customVin || vin;
    const error = validateVin(vinToUse);

    if (error) {
      setError(error);
      return;
    }

    setLoading(true);

    setError(null);

    try {
      const data = await decodeVIN(vinToUse);
      setResult(data);

      setHistori((prev) => {
        const newHistory = [vinToUse, ...prev.filter((v) => v !== vinToUse)];
        return newHistory.slice(0, 3);
      });
    } catch {
      setError("Помилка Запиту");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectFormHistory(vin) {
    handleDecode(vin);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>VIN Decoder</h1>
        <p className={styles.subtitle}>Professional Vehicle Information</p>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="Enter VIN Code"
            maxLength="17"
          />
        </div>

        <button
          className={styles.decodeButton}
          onClick={() => handleDecode()}
          disabled={loading}
        >
          {loading ? "Decoding..." : "Decode VIN"}
        </button>

        {loading && (
          <div className={styles.statusMessage + " " + styles.loading}>
            Завантаження...
          </div>
        )}
        {!loading && error && (
          <div className={styles.statusMessage + " " + styles.error}>
            {error}
          </div>
        )}
        {!loading && !error && result && (
          <div className={styles.statusMessage + " " + styles.success}>
            {result.Message}
          </div>
        )}
      </div>

      <div className={styles.resultsSection}>
        <VinResults result={result} />
      </div>

      <div className={styles.historySection}>
        <VinHistory
          onSelectFromHistory={handleSelectFormHistory}
          history={history}
        />
      </div>
    </div>
  );
}

export default HomePage;
