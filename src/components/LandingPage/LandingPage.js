import { auth, db } from '../../firebase';
import styles from './LandingPage.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';

function LandingPage() {
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
			<div className = {styles.container}>
				<div className = {styles.innerBox}>
					<div
						style= {{ textAlign: 'center' }}
						onLoad={handleCheckList}>
						<button onClick={handleCheckList}>Get Files</button>
						<ul>
							{arrayOfDocs.map(function (doc, index) {
								return (
									<li key={index}>
										<Link
											to="/listpage"
											state= {{ docID: doc.id }}>
											{index+1}  Name:{doc.data()['name']}  Created-on: {doc.data()['date']} at {doc.data()['time']}  Records: {doc.data()['array'].length}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
	);
}

export default LandingPage;
