import styles from "../styles/VinResults.module.css";

function VinResults({ result }) {
  if (!result || !result.Results) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vehicle Information</h2>
      <div className={styles.grid}>
        {result.Results.filter((item) => item.Value).map((item, index) => (
          <div key={`${item.VariableId}-${index}`} className={styles.item}>
            <div className={styles.label}>{item.Variable}</div>
            <div className={styles.value}>{item.Value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VinResults;
