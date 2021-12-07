import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';

import './App.css';

import Sidebar from './Containers/Sidebar';
import Chat from './Containers/Chat';
import Login from './Containers/Login'

import { selectUser } from './features/userSlice';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName
					})
				);
			} else {
				// The user is logged out
				dispatch(logout());
			}
		});
	}, [dispatch]);

	return (
		<div className="app">
			{ user ? (
				<Fragment>
					<Sidebar />
					<Chat />
				</Fragment>
			) : (
				<Login />
			)}
			
			
		</div>
	);
}

export default App;
