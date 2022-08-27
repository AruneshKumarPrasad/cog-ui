import React from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>
          <Link to="/login">
            Login
            </Link>
        </h1>
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
        <br />
        <h2>Login Please</h2>
      </div>
    </div>
  );
}

export default Home;