import { NavLink, useLocation } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { content: "Home", to: "/#home", section: "home" },
    { content: "About", to: "/#about", section: "about" },
    { content: "Projects", to: "/projects" },
    { content: "Blog", to: "/blog" },
  ];

  const isCurrentSection = (section) => {
    if (location.pathname !== "/") return false;

    const currentSection = location.hash.slice(1) || "home";
    return currentSection === section;
  };

  return (
    <header className={styles.header}>
      <ul className={styles.nav}>
        {navItems.map((item) => (
          <li key={item.to} className={styles["nav-item"]}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                item.section
                  ? isCurrentSection(item.section)
                    ? styles.active
                    : ""
                  : isActive
                  ? styles.active
                  : ""
              }
            >
              {item.content}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
