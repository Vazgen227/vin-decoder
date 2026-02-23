import { useState, useEffect } from "react";
import { getVariablesList } from "../utils/api";
import { Link } from "react-router-dom";
import styles from "../styles/VariablesPage.module.css";

function VariablePage() {
  const [variable, setVariable] = useState([]);

  useEffect(() => {
    async function fetchVariables() {
      const data = await getVariablesList();
      setVariable(data.Results);
    }
    fetchVariables();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>VIN Variables</h1>
        <p className={styles.subtitle}>Complete Database</p>
      </div>

      <div className={styles.grid}>
        {variable.map((item) => (
          <div key={item.ID} className={styles.card}>
            <Link to={`/variables/${item.ID}`} className={styles.cardLink}>
              <h3 className={styles.cardTitle}>{item.Name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VariablePage;
