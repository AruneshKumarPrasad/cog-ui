import { signOut } from "firebase/auth";
import { auth,db } from "../../firebase";
import styles from "./LandingPage.module.css";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";


function LandingPage(props) {

    // Sign-out and Navigation
    const navigate = useNavigate();
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const handleLogout = () => {
        setSubmitButtonDisabled(true);
        signOut(auth)
        .then(async (res) => {
            //Sign-out Successful
            setSubmitButtonDisabled(false);
            navigate("/");
          })
          .catch((err) => {
            setSubmitButtonDisabled(false);
            //Sign-out Failed!
          });
    };

    const [arrayOfDocs, setArrayOfDocs] = useState([])

    const handleCheckList = async () => {
      setArrayOfDocs(arrayOfDocs => []);
      const docsRef = collection(db, "users",auth.currentUser.uid,'documents');

      // Create a query against the collection.
      const q = query(docsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setArrayOfDocs(arrayOfDocs => [...arrayOfDocs,doc.id]);
      });
    };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div style={{ textAlign: "center" }}>
          <h1>
            <Link to="/upload">
              Upload Page
            </Link>
          </h1>
          <h1 className={styles.heading}>
            <button disabled={submitButtonDisabled} onClick={handleLogout}>
              Log-out
            </button>
          </h1>
          <h2 className={styles.heading}>REACT-JS CSV LIST </h2>
          <h2>Available: </h2>
          <h1 className={styles.heading}>
            <button onClick={handleCheckList}>
              Check List
            </button>
          </h1>
          <ul>
                {arrayOfDocs.map(function(doc, index){
                    return <li key={ index }>
                      <Link to="/listpage" state = {{ docID: doc}}>
                        {doc}
                      </Link>
                            </li>;
                })}
            </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;