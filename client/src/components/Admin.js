import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import '../style/css/admin.css';

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			price: '',
			images: '',
			nb_views: '',
			stock: '',
			category : [],
		};
		this.ip = 'http://127.0.0.1:8000';
		this.parseCategory = this.parseCategory.bind(this)
		this.change = this.change.bind(this);
		this.Getcategory = this.Getcategory.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	parseCategory (data)
	{
		let c = -1;
		while (data[++c])
		{
		  this.state.category.push(data[c]);
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

	change(e) {
		if (e.target.name === "title") {
			this.state.title = e.target.value;

		} else if (e.target.name === "description") {
			this.state.description = e.target.value;

		} else if (e.target.name === "price") {
			this.state.price = e.target.value;

		} else if (e.target.name === "images") {
			this.state.images = e.target.value;

		} else if (e.target.name === "stock") {
			this.state.stock = e.target.value;

		} else if (e.target.name === "category") {
			this.state.category = e.target.value;

		}
	}

	addItem(e) {
		const headers = {
			'Content-Type': 'multipart/form-data',
			'token': localStorage.getItem('token'),
			'Access-Control-Allow-Credentials': true
		};
		e.preventDefault();
		console.log(this.state.title);
		const formData = new FormData();
		Object.keys(this.state).forEach((v) => formData.append(v, this.state[v]));
		axios.post(this.ip+'/article', formData,{headers:headers})
			.then(res => {
				console.log(res.data)
			})
	}

	render() {
		return (
			<section id="stn-adminCreate" className="col-12 h-100 d-flex">
				<form id="form-add" method="post"
				      className="d-flex col-md-12 h-50 m-auto">
					<div className="d-flex flex-column mh-100 col-12">
						<div className="d-flex h-75 m-5">
							<div className="col-6 d-flex flex-column ">
								<label className="d-flex flex-column">Title
									<input
										className="outlined-name"
										name="title"
										type="string"
										onChange={this.change}
									/>
								</label>
								<label className="d-flex flex-column">Description
									<input
										className="outlined-name"
										name="description"
										type="string"
										onChange={this.change}

									/>
								</label>
								<label className="d-flex flex-column">Price
									<input
										className="outlined-name"
										name="price"
										type="number"
										onChange={this.change}

									/>
								</label>
							</div>
							<div className="col-6 d-flex justify-content-around flex-column">
								<label className="d-flex flex-column">Images
									<input
										name="image"
										type="file"
										onChange={this.change}
									/>
								</label>
								<label className="d-flex flex-column">Stock
									<input
										className="outlined-name"
										name="stock"
										type="number"
										onChange={this.change}
									/>
								</label>
								<label className="d-flex flex-column">Category
									<input
										className="outlined-name"
										name="category"
										type="string"
										onChange={this.change}/>
								</label>
							</div>
						</div>
						<Fab id="button-add" onClick={this.addItem} type="submit" className="w-25 ml-auto "
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