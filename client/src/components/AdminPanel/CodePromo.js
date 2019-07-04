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
			getCodeHtml: '',
			addCodes: [{
				code: '',
				reduction: 0
			}],
			header: { token: localStorage.getItem('token')},
		};
		this.ip = 'http://127.0.0.1:8000';
		this.sendCode = this.sendCode.bind(this);
		this.addCode = this.addCode.bind(this);
		this.rmCode = this.rmCode.bind(this);
		this.tamereConstruct = this.tamereConstruct.bind(this);
		this.changeCodePromo = this.changeCodePromo.bind(this);
		this.getCode = this.getCode.bind(this);
		this.removeCode = this.removeCode.bind(this);
	}

	componentDidMount()
	{
		this.getCode();
	}

	async 	getCode()
	{
		await axios.get(this.ip + '/promotionCode',
			{headers: this.state.header}).then(
			(res) =>
			{
				this.setState({getCode: res.data});
				this.displayCode();
			});
	}

	removeCode(event)
	{
		let key = event.target.id.split('-')[1];
		let id = this.state.getCode[parseInt(key)];
		axios.delete(this.ip + '/promotionCode/' + id,
			{headers: this.state.header}).then(
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

	displayCode()
	{
		let htmlCode =
			<div>
				{this.state.getCode.map((data, i) =>
					<ul key={"getCode" + i}>
						<button id={"deleteCode-" + i}>Delete</button>
						<p>code: {data.code}</p>
						<p>Reduction: {data.reduction}</p>
					</ul>
				)}
			</div>;
		this.setState({getCodeHtml: htmlCode});
	}

	addCode()
	{
		let newCode = {
			code: '',
			reduction: 0
		};
		let codes = this.state.addCodes;
		codes.push(newCode);
		this.setState({addCodes: codes});
	}

	rmCode(event)
	{
		let key = parseInt(event.target.id.split('-')[1]);
		let codes = this.state.addCodes;
		if (codes.length > 1)
		{
			codes.splice(key, 1);
		}
		this.setState({addCodes: codes});
	}

	tamereConstruct()
	{
		return (new Promise ((resolve) =>
		{
			let c = -1;
			let leng = this.state.addCodes.length;
			let code = this.state.addCodes;
			while (++c < leng)
			{
				code[c].code = document.getElementById('code-' + c).value;
				code[c].reduction = document.getElementById('reduction-' + c).value;
			}
			resolve(code);
		}))
	}

	async sendCode()
	{
		axios.post(this.ip + '/promotionCode', await this.tamereConstruct(),
			{headers: this.state.header}).then(
			(res) =>
			{
				console.log(res);
			}
		)
	}

	changeCodePromo(event)
	{
		let code = this.state.addCodes;
		let table = event.target.id.split('-');
		code[parseInt(table[1])][table[0]] = event.target.value;
		this.setState({addCodes : code});
		console.log(this.state.addCodes);
	}

	render()
	{
		return (
			<div>
				<div>
					<button onClick={this.sendCode}>Create</button>
					<button onClick={this.addCode}>Add Codes</button>
					{this.state.addCodes.map((data, i) =>
						<ul key={'Code' + i}>
							<button id={"promotionCode-" + i} onClick={this.rmCode}>Remove</button>
							<label htmlFor={"code"}> Code Promo: </label>
							<input type="text" id={'code-' + i} value={data.code} onChange={this.changeCodePromo}/>
							<label htmlFor={'reduction-' + i}> Pomotion: </label>
							<input type="number" value={data.reduction} max={100} id={'reduction-' + i} onChange={this.changeCodePromo}/>
						</ul>
					)}
				</div>
				<div>
					{this.state.getCodeHtml}
				</div>
			</div>
		);
	}
}

export default CodePromo;