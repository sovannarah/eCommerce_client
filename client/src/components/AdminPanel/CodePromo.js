import React from 'react';
import axios from 'axios';
// import {Promise} from "q";

class CodePromo extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			getCodes: [],
			addCodes: [{
				code: '',
				reduction: 0
			}],
			header: { token: localStorage.getItem('token')},
		};
		this.ip = 'http://127.0.0.1:8000';
		this.sendCode = this.sendCode.bind(this);
		this.addCode = this.addCode.bind(this);
	}

	addCode()
	{
		let newCode = {
			code: '',
			reduction: 0
		};
		let codes = this.state.addCode();
		codes.push(newCode);
	}
	sendCode()
	{
		axios.post(this.ip + '/promotionCode', this.state.addCodes,
			{headers: this.state.headers}).then(
			(res) =>
			{
				console.log(res);
			},
			(err) =>
			{
				console.log(err);
			}
		)
	}
	render()
	{
		return (
			<div>
				<button>Add Codes</button>
				{this.state.addCodes.map((data, i) =>
					<ul key={'Code' + i}>
						<button>Remove</button>
						<label htmlFor={"newCode"}> Code Promo: </label>
						<input type="text" id={'code' + i} defaultValue={data.code}/>
						<label htmlFor={'promotion' + i}> Pomotion: </label>
						<input type="number" defaultValue={data.reduction} max={100}/>
					</ul>
				)}
			</div>
		);
	}
}

export default CodePromo;