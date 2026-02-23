import styles from "../styles/VinHistory.module.css";

function VinHistory({ history, onSelectFromHistory }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Searches</h3>
      <div className={styles.list}>
        {history.map((item) => (
          <button
            key={item}
            className={styles.historyButton}
            onClick={() => onSelectFromHistory(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VinHistory;
