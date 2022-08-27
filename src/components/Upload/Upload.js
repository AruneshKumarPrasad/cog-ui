import React, { useState } from "react";
import Papa from "papaparse";
import styles from "./Upload.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection, query, where } from "firebase/firestore";

// Allowed extensions for input file
const allowedExtensions = ["csv"];


const Upload = () => {

    const navigate = useNavigate();
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    const [nameOfFile, setName] = useState("");

    const [date, setDate] = useState("");

    const [time, setTime] = useState("");

    var today = new Date();
    
    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            const dateInstance = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const timeInstance = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const nameFile = inputFile.name;
            setDate(dateInstance);
            setTime(timeInstance);
            setName(nameFile);
            setFile(inputFile);
        }
    };
    
    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            const docRef= doc(db, "users", auth.currentUser.uid, "documents", nameOfFile)
            await setDoc(docRef, {
                date : date,
                time : time,
                uploader : auth.currentUser.displayName,
                array : parsedData,
                keys : columns,
                name : nameOfFile
            } , { merge: true });
        };
        reader.readAsText(file);
        navigate("/landingpage");

    };

    return (
        <div className={styles.container}>
        <div className={styles.innerBox}>
            <h1>
            <Link to="/landingpage">
                LandingPage
            </Link>
            </h1>
            <h1>
                <Link to="/listpage">ListPage</Link>
                </h1>
                <label htmlFor="csvInput" style={{ display: "block" }}>
                    Enter CSV File
                </label>
                <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button onClick={handleParse}>Parse</button>
            </div>
            <div style={{ marginTop: "3rem" }}>
                {error ? error :  ""}
            </div>
            </div>
        </div>
    );
};

export default Upload;