import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./home.module.css";

const skills = ["React", "Kotlin", "FastAPI", "Firebase"];

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    const sectionId = hash.slice(1) || "home";
    const section = document.getElementById(sectionId);

    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div className={styles.page}>
      <section
        id="home"
        className={styles.hero}
        aria-labelledby="home-heading"
      >
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Software Developer</p>
          <h1 id="home-heading" className={styles.title}>
            Hi, I&apos;m Luis Orellana.
            <span>I build thoughtful software for real-world problems.</span>
          </h1>
          <p className={styles.introduction}>
            I create web, mobile, and backend experiences with a focus on clean
            code, practical solutions, and products that are easy to use.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="/projects">
              Explore my projects
            </Link>
            <Link className={styles.secondaryAction} to="/#about">
              More about me
            </Link>
          </div>
        </div>

        <aside className={styles.profileCard} aria-label="Technology overview">
          <p className={styles.cardLabel}>Currently building with</p>
          <ul className={styles.skillList}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p className={styles.cardNote}>
            From responsive React interfaces to Android applications and API
            services.
          </p>
        </aside>
      </section>

      <section
        id="about"
        className={styles.about}
        aria-labelledby="about-heading"
      >
        <div>
          <p className={styles.eyebrow}>About me</p>
          <h2 id="about-heading" className={styles.sectionTitle}>
            Curious by nature, practical by design.
          </h2>
        </div>

        <div className={styles.aboutContent}>
          <p>
            I&apos;m a software developer who enjoys turning ideas into useful,
            reliable applications. My work spans responsive web interfaces,
            Android development, backend APIs, and cloud-connected experiences.
          </p>
          <p>
            I care about understanding the problem before choosing the
            technology. Whether I&apos;m collaborating with a team or building
            independently, I aim to write maintainable code and create an
            experience that feels clear to the person using it.
          </p>
          <p>
            This portfolio is a growing collection of the projects I&apos;ve built,
            the decisions behind them, and the lessons I&apos;ve learned along the
            way.
          </p>
        </div>
      </section>
    </div>
  );
}
