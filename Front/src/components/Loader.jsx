import { ClipLoader } from 'react-spinners'
import styles from "./Loader.module.css"

function Loader() {
  return (
    <div className={styles.loader}>
        <ClipLoader color="rgb(54, 215, 183)" size={60}/>
        <p className={styles.text}> در حال دریافت اطلاعات ...</p>
    </div>
  )
}

export default Loader