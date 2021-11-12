import React from 'react';
import logo from './logo.svg';
import './App.css';
import BaseForm from './Components/BaseForm'
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Nav';
import Transition from './Components/Transition';

function App() {
	return (
		// <Router>
		// 	<Nav />
		// 	<Transition />
		// </Router>
		<BaseForm/>
	);
}

export default App;
