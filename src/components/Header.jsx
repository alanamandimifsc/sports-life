import { Link } from "react-router-dom";
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>

            <nav className={styles.nav}>
                <Link to="/dashboard" className={styles.link}>Home</Link>

                <Link to="/login" className={styles.link}>Login</Link>
                <Link to="/registerUser" className={styles.link}>Register User</Link>
                <Link to="/registerPlace" className={styles.link}>Register Place</Link>
                <Link to="/placeList" className={styles.link}>Place List</Link>

            </nav>
        </header>
    );
}

export default Header;