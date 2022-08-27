import { auth, db } from '../../firebase';
import styles from './LandingPage.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTableCells } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav/Nav';

function LandingPage(props) {
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

	const handleDelete = async (fileName) => {
		await deleteDoc(
			doc(db, 'users', auth.currentUser.uid, 'documents', fileName)
		).catch((err) => {
			console.log(err);
		});
		handleCheckList();
	};

	return (
		<div className={styles.container}>
			<Nav />
			<div className={styles.innerBox}>
				<div style={{ textAlign: 'center' }} onLoad={handleCheckList}>
					<button onClick={handleCheckList}>Get Files</button>
					<br />
					<br />
					<table className={styles.tbl}>
						<thead>
							<tr>
								<th>S no</th>
								<th>Name</th>
								<th>Number of records</th>
								<th>Created at</th>
								<th>Delete</th>
								<th>Preview</th>
							</tr>
						</thead>
						<tbody>
							{arrayOfDocs.map(function (doc, index) {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{doc.data()['name']}</td>
										<td>{doc.data()['array'].length}</td>
										<td>
											{doc.data()['date']} |{' '}
											{doc.data()['time']}
										</td>
										<td>
											<span className={styles.deletebtn}>
												<FontAwesomeIcon
													onClick={() =>
														handleDelete(doc.id)
													}
													icon={faTrash}
												/>
											</span>
										</td>
										<td>
											<Link
												to="/listpage"
												state={{ docID: doc.id }}>
												<FontAwesomeIcon
													icon={faTableCells}
												/>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
