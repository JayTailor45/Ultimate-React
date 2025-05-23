import styles from './Sidebar.module.css';
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import {Outlet} from "react-router-dom";

function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav />

            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWide Inc.</p>
            </footer>

        </div>
    );
}

export default SideBar;