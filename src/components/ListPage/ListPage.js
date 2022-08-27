import styles from './ListPage.module.css';
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

function ListPage() {
	const location = useLocation();
	const { docID } = location.state;
	const [array, setArray] = useState([]);
	const [headerArray, setHeaderArray] = useState([]);
	const firebaseToArray = async (string) => {
		const docsRef = collection(
			db,
			'users',
			auth.currentUser.uid,
			'documents'
		);
		const q = query(docsRef, where('name', '==', docID));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data()['name']);
			setArray([...doc.data()['array']]);
			setHeaderArray([...doc.data()['keys']]);
			console.log(' - > ' + Object.keys(array[0]));
			console.log(' - > ' + Object.values(array[0]));
		});
	};

	return (
		<div className={styles.container}>
			<Nav />
			<h1 className={styles.backbtn}>
				<Link to="/landingpage">
					{' '}
					<FontAwesomeIcon icon={faArrowLeftLong} />
				</Link>
			</h1>
			<div className={styles.innerBox}>
				<div style={{ textAlign: 'center' }}>
					<button onClick={firebaseToArray}>Preview</button>
					<br />
					<br />
					<table className={styles.tbl}>
						<thead>
							<tr key={'header'}>
								{headerArray.map((key) => (
									<th>{key}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{array.map((item) => (
								<tr>
									{headerArray.map((key) => (
										<td>{item[key]}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ListPage;
