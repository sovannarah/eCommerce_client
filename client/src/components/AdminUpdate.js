import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../style/css/adminupdate.css';
import {MenuList} from "@material-ui/core";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ title : 'Category', field: 'category.id', lookup: {}},
				{ title: 'Name', field: 'title' },
				{ title: 'Price', field: 'price', type: 'numeric' },
				{ title: 'Stock', field: 'stock', type: 'numeric' },
				{
					title: 'Description',
					field: 'description',
				},
				{ title: 'Visiteur', field: 'nb_views', editable: 'never'}
			],
			data: [
			],
			headers : {
				'Content-Type': 'multipart/form-data',
				'token': localStorage.getItem('token'),
				'Access-Control-Allow-Credentials': true
			},
			category : [],
			category_id: '',
			category_name : '',
			parent_name: 'None'
		};
		this.ip = 'http://127.0.0.1:8000';
		this.handleChange = this.handleChange.bind(this);
		this.parseCategory = this.parseCategory.bind(this)
	}

	async componentDidMount () {
		if (!localStorage.getItem('token'))
			window.location.replace('/');
		else
		{
			await axios.get(this.ip + '/user/' + localStorage.getItem('token') +
				'/check').then(
				() =>
				{
					console.log("===== Welcome ========");
				},
				() =>
				{
					window.location.replace('/');
				})
		}
		axios.get(this.ip + '/article')
			.then(res => {
				console.log('======= get article ========');
				console.log(res.data);
				console.log("=============================");
				// for(let oui in res.data) {
				//   res.data[oui]['category_name'] = res.data[oui].category.name
				//   res.data[oui]['category_id'] = res.data[oui].category.id
				// }
				this.setState({data : res.data})
			})
			.catch(err => {
				console.log(err);
			})
		let data2 = await this.Getcategory();
		console.log('===== get rec category ======');
		console.log(data2);
		console.log("=============================");
		this.parseCategory(data2);
		this.forceUpdate()
	}

	parseCategory (data)
	{
		let c = -1;
		while (data[++c])
		{
		  this.state.columns[0].lookup[data[c].id] = data[c].name;
		  this.state.category.push(data[c])
		  if (data[c].sub && data[c].sub.length > 0)
		  	this.parseCategory(data[c].sub);
		}

	}

	Getcategory () {
		return axios.get(this.ip + '/category')
			.then(res => {
				return (res.data)
			})
			.catch(err => {
				console.log(err);
			})
	}

	handleChange(event) {
		console.log(event);
		this.setState({ parent_name: event._targetInst.stateNode.innerText});
		this.setState({category_id: event._targetInst.stateNode.id})
	}

	async newCat () {
		const data = {
			parentId: this.state.category_id,
			name: this.state.category_name
		};
		await axios.post(this.ip + '/category', data,{headers: { 'token': this.state.headers['token']}})
			.then(async (res)=> {
				console.log("======== get category ===========");
				console.log(res.data);
				console.log("===============================");
				let data2 = await this.Getcategory();
				this.parseCategory(data2);
			})
			.catch(err => {
				this.setState({'errorCat': err.response.data})
			})
	}


	render() {
		return (
			<div>
				<MaterialTable
					style={{marginTop : 120 }}
					title="Products"
					columns={this.state.columns}
					data={this.state.data}
					actions={[
						{
							icon : 'add',
							tooltip : 'Create Product',
							isFreeAction: true,
							onClick : () => {
								this.props.history.push('/admin/create')
							}
						}
					]}
					editable={{
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									console.log(newData)
									const data = this.state.data;
									data[data.indexOf(oldData)] = newData;
									console.log(data[data.indexOf(oldData)] = newData);
									const formData = new FormData();
									Object.keys(this.state.data[data.indexOf(newData)]).forEach((v) => formData.append(v, this.state.data[data.indexOf(newData)][v]));
									this.setState({ data });
									formData.append('category', this.state.data[data.indexOf(newData)].category.id)
									axios.post(this.ip + '/article/' + data[data.indexOf(newData)].id, formData,{headers:this.state.headers})
										.then(res => {
											console.log(res.data)
										})
										.catch(console.log)
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									const data = this.state.data;
									const remain = data.splice(data.indexOf(oldData), 1);
									axios.delete(this.ip + '/article/'+ remain[0].id,{headers:this.state.headers})
									.then(res => {
										console.log("======= delete article =======");
										console.log(res);
										console.log("==============================");
									})
									.catch(console.log)
									this.setState({ data });
									console.log(this.state.category);
								}, 600);
							}),
					}}
				/>
				<section className="col-12 h-10 d-flex mt-5 mb-5">
					<Select
						value={this.state.category_id}
						onChange={this.handleChange}
						inputProps={{
							name: 'Category',
							id: 'id'
						}}>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{this.state.category.map((data, i) =>
							<ul key={i}>
							<MenuItem id={ data.id } value={data.id}>
								{ data.name }
							</MenuItem>
							</ul>
						)}
					</Select>
					<p>{ this.state.parent_name }</p>
					<TextField
						id="standard-name"
						label="Name"
						value={this.state.category_name}
						onChange={(event) => {this.setState({category_name : event.target.value})}}
						margin="normal"
					/>
					<Button variant="contained" color="primary" onClick={this.newCat.bind(this)}>
						Create Category
					</Button>
				</section>
			</div>

		);
	}
}

export default Admin;