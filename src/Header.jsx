import { Link } from "react-router-dom";
import styles from "./styles/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/variables" className={styles.link}>
          Variables
        </Link>
      </nav>
    </header>
  );
}

export default Header;
