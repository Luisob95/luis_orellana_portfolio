import { NavLink, useLocation } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();
  const hash = location.hash;

  const navItems = [
    {
      content: "Luis Orellana Portfolio",
      to: "/",
      navlinkClassName: ({ isActive }) => (isActive ? styles.active : ""),
    },

    {
      content: "About",
      to: "/about",
      navlinkClassName: ({ isActive }) => (isActive ? styles.active : ""),
    },
    {
      content: "Projects",
      to: "/projects",
      navlinkClassName: ({ isActive }) => (isActive ? styles.active : ""),
    },
    {
      content: "Blog",
      to: "/blog",
      navlinkClassName: ({ isActive }) => (isActive ? styles.active : ""),
    },
  ];
  return (
    <header className={styles.header}>
      <ul className={styles.nav}>
        {navItems.map((item) => (
          <li key={item.to} className={styles["nav-item"]}>
            <NavLink to={item.to} className={item.navlinkClassName}>
              {item.content}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
