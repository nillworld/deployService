import React, { useState } from 'react';
import './App.css';
import BaseForm from './Components/BaseForm';
import MyForm from './Components/MyForm';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Nav';
import Transition from './Components/Transition';
import * as fs from 'fs';

/* function App() {
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
} */
const test = (test: any) => {
    fs.writeFile('../test.txt', `ee`, function (err) {
        if (err === null) {
            console.log('success');
        } else {
            console.log('fail');
        }
    });
};
function App() {
    const onSubmit = (form: { baseImg: string; workdir: string }) => {
        console.log(form);
        test(form);
    };

    return <MyForm onSubmit={onSubmit} />;
}

export default App;
