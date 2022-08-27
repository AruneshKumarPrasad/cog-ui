import { auth, db } from '../../firebase';
import styles from './LandingPage.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, getDocs,doc, deleteDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTableCells } from '@fortawesome/free-solid-svg-icons';

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

	const handleDelete = async () => {
		await deleteDoc(doc(db, "cities", "DC"));
	};

	return (
		<div className={styles.container}>
			<div className={styles.innerBox}>
				<div style={{ textAlign: 'center' }} onLoad={handleCheckList}>
					<button onClick={handleCheckList}>Get Files</button>

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
										{/* <thead>
											<tr key={'header'}>
												{headerArray.map((key) => (
													<th>{key}</th>
												))}
											</tr>
										</thead> */}

										{/* <td>1</td>
											<td>sdasadas</td>
											<td>21313</td>
											<td>12-122222</td> */}
										<td>{index + 1}</td>
										<td>{doc.data()['name']}</td>
										<td>{doc.data()['array'].length}</td>
										<td>{doc.data()['date']}  {doc.data()['time']}</td>
										<td>
											<FontAwesomeIcon icon={faTrash} />
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

										{/* <Link
											to="/listpage"
											state={{ docID: doc.id }}>
											{index + 1} {doc.data()['name']}{' '}
											{doc.data()['time']}{' '}
											{doc.data()['array'].length}
										</Link> */}
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
