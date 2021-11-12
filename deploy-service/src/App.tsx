import React, { useState } from 'react';
import './App.css';
import BaseForm from './Components/BaseForm'
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Nav';
import Transition from './Components/Transition';

function App() {
	const [inputValue, setInputValue] = useState<string>("");
	const updateInputValue = (e: any) => {
		const value = e.target.value;
		setInputValue(() => {
			console.log(value)
			return value
		} )
	}
	return (
		// <Router>
		// 	<Nav />
		// 	<Transition />
		// </Router>
		<BaseForm updateInputValue={updateInputValue}/>
	);
}

export default App;
