import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import '../style/css/admin.css';

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.ip = 'http://10.34.6.23:8000';
		this.parseCategory = this.parseCategory.bind(this);
		this.Getcategory = this.Getcategory.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	async componentDidMount() {
		if (!localStorage.getItem('token'))
			window.location.replace('/');
		else {
			await axios.get(this.ip + '/user/' + localStorage.getItem('token') +
				'/check').then(
				() => {
					console.log("===== Welcome ========");
				},
				() => {
					window.location.replace('/');
				})
		}
	}

	parseCategory(data)
	{
		let c = -1;
		while (data[++c]) {
			this.state.category.push(data[c]);
			if (data[c].sub && data[c].sub.length > 0)
				this.parseCategory(data[c].sub);
		}

	}

	Getcategory()
	{
		return axios.get(this.ip + '/category')
			.then(res => {
				return (res.data)
			})
			.catch(err => {
				console.log(err);
			})
	}


	addItem(e)
	{
		e.preventDefault();
		const headers = {
			'Content-Type': 'multipart/form-data',
			'token': localStorage.getItem('token'),
			'Access-Control-Allow-Credentials': true};
		// console.log(this.state.images);
		const formData = new FormData(e.target);
		// Object.keys(this.state).forEach((v) => formData.append(v, this.state[v]));
		// console.log(formData.getAll('images'));
		axios.post(this.ip + '/article', formData, {headers: headers})
			.then((res) => {
				console.log(res.data);
			});
	}

	render()
	{
		return (
			<section id="stn-adminCreate" className="col-12 h-100 d-flex">
				<form id="form-add" method="post" onSubmit={this.addItem}
					className="d-flex col-md-12 h-50 m-auto">
					<div className="d-flex flex-column mh-100 col-12">
						<div className="d-flex h-75 m-5">
							<div className="col-6 d-flex flex-column ">
								<label className="d-flex flex-column">Title
									<input
										className="outlined-name"
										name="title"
										type="string"
									/>
								</label>
								<label className="d-flex flex-column">Description
									<input
										className="outlined-name"
										name="description"
										type="string"

									/>
								</label>
								<label className="d-flex flex-column">Price
									<input
										className="outlined-name"
										name="price"
										type="number"

									/>
								</label>
							</div>
							<div
								className="col-6 d-flex justify-content-around flex-column">
								<label className="d-flex flex-column">Images
									<input
										name="images[]"
										type="file"
										accept='image/*'
										multiple
									/>
								</label>
								<label className="d-flex flex-column">Stock
									<input
										className="outlined-name"
										name="stock"
										type="number"
									/>
								</label>
								<label className="d-flex flex-column">Category
									<input
										className="outlined-name"
										name="category"
										type="number"/>
								</label>
							</div>
						</div>
						<Fab id="button-add"
						     type="submit" className="w-25 ml-auto "
						     variant="extended" color="secondary">
							Add Item
						</Fab>
					</div>
				</form>
			</section>
		);
	}
}

export default Admin;