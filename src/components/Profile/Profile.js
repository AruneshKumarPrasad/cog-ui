import { useState } from 'react';
import { signOut } from 'firebase/auth';
import './profile.css';
import React from 'react';
import Nav from '../Nav/Nav';
import { auth } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Profile() {
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
	return (
		<>
			<Nav />
			<br />
			<br />
			<div className="profile">
				<FontAwesomeIcon icon={faUserCircle} size="4x" />

				<label>Username: {auth.currentUser.displayName}</label>
				<span></span>
				<label>Time Of Login: {auth.currentUser.metadata.lastSignInTime}</label>
				<label>Email: {auth.currentUser.email}</label>
				<button submitButtonDisabled={submitButtonDisabled} onClick={handleLogout} class="btn btn-primary">
					Logout
				</button>
			</div>
		</>
	);
}

export default Profile;
