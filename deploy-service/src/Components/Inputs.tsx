import React from 'react';
import './Inputs.css';

let a = false

const InputBox = (props: { test: string, value: any, inputList: Array<string>}) => {
	return (
		<div className="InputBox">
			ee
			{props.inputList.map((inputBox, index) => {
				return (
					<div>
						<h2>
							{inputBox}
						</h2>
						<input placeholder={inputBox} onChange={props.value} />
					</div>
				)
			})}
			{a && <h1> hi</h1>}
		</div>
	)
}

export default InputBox