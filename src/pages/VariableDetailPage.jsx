import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/VariableDetailPage.module.css";
import { getVariablesList } from '../utils/api';
import {stripHtmlTags} from '../utils/validation'

function VariableDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const{data, isLoading} = useQuery({
    queryKey: ['variables'],
    queryFn: async () =>{
      const response = await getVariablesList()
      return response.Results
    }
  });

  if(isLoading){
    return(
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );      
  }

  const selectedVariable = data?.find(
    (item) => item.ID === Number(id)
  )

  const cleanDescription = stripHtmlTags(selectedVariable.Description)

  if (!selectedVariable) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          Variable Not Found
          <button className={styles.backList} onClick={() => navigate('/variables')}>
            Back to List
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.container}>

     <button 
        onClick={() => navigate(-1)} 
        className={styles.backButton}
      >
        ← Back
      </button>

      <div className={styles.card}>
        <h1 className={styles.title}>{selectedVariable.Name}</h1>
        <p className={styles.description}>{cleanDescription}</p>
      </div>
    </div>
  );
}

export default VariableDetailPage;