import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import styles from './LandingPage.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import Nav from '../Nav/Nav';

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
				navigate('/');
			})
			.catch((err) => {
				setSubmitButtonDisabled(false);
				//Sign-out Failed!
			});
	};

	const [arrayOfDocs, setArrayOfDocs] = useState([]);

	const handleCheckList = async () => {
		setArrayOfDocs((arrayOfDocs) => []);
		const docsRef = collection(
			db,
			'users',
			auth.currentUser.uid,
			'documents'
		);

		// Create a query against the collection.
		const q = query(docsRef);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setArrayOfDocs((arrayOfDocs) => [...arrayOfDocs, doc]);
		});
	};

	return (
		<>
			<Nav />
			<div className = {styles.container}>
				<div className = {styles.innerBox}>
					<div
						className style= {{ textAlign: 'center' }}
						onLoad={handleCheckList}>
						<button onClick={handleCheckList}>Get Files</button>
						<ul>
							{arrayOfDocs.map(function (doc, index) {
								return (
									<li key={index}>
										<Link
											to="/listpage"
											state= {{ docID: doc.id }}>
											{index+1} {doc.data()['name']} {doc.data()['time']} {doc.data()['array'].length}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default LandingPage;
