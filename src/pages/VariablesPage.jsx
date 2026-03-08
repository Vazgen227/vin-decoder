
import { useQuery } from '@tanstack/react-query';
import { getVariablesList } from "../utils/api";
import { Link } from "react-router-dom";
import styles from "../styles/VariablesPage.module.css";

function VariablePage() {
  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['variables'],
    queryFn: async () => {
      const response = await getVariablesList();
      return response.Results
    },
    staleTime: 5 * 60 * 1000,
  });

  if(isLoading){
    return(
      <div className={styles.container}>
        <div className= {styles.loading}>Loading variables...</div>
      </div>
    )
  }

  if(error){
    return(
      <div className={styles.container}>
        <div className={styles.error}>
          Error: {error.message}
          <button onClick={() => refetch()}>Retry</button>
        </div>
      </div>      
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>VIN Variables</h1>
        <p className={styles.subtitle}>Complete Database</p>
      </div>

      {isFetching && <span className={styles.updating}>Updating...</span>}

      <div className={styles.grid}>
        {data.map((item) => (
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