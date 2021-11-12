import React, { useState } from 'react';
import './BaseForm.css';
import Inputs from './Inputs';

const BaseForm = (props:{updateInputValue : any}) => {
	// const [inputValue, setInputValue] = useState<string>("");
	// const updateInputValue = (e: any) => {
	// 	const value = e.target.value;
	// 	setInputValue(() => {
	// 		console.log(value)
	// 		return value
	// 	} )
	// }

	const inputList = ["DockerImg", "test1", "test2", "test3"]

	return (
		<div className="BaseForm">
			<Inputs test={'기입'} value={props.updateInputValue} inputList={inputList}/>
		</div>
		
	)
}

export default BaseForm