import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVariablesList } from "../utils/api";
import styles from "../styles/VariableDetailPage.module.css";

function VariableDetailPage() {
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchVariables() {
      setLoading(true);

      const data = await getVariablesList();

      const numberId = Number(id);
      const selectObject = data.Results.find((item) => item.ID === numberId);

      setSelectedVariable(selectObject);

      setLoading(false);
    }
    fetchVariables();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!selectedVariable) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>Variable Not Found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{selectedVariable.Name}</h1>
        <p className={styles.description}>{selectedVariable.Description}</p>
      </div>
    </div>
  );
}

export default VariableDetailPage;
