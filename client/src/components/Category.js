import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * @param split url to get the last value
 */
let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			data: {},
			check: false
		};
		this.ip = 'http://127.0.0.1:8000'
	}
	async componentDidMount() {
		/**
		 * @param show category user click on
		 */
		axios.get(this.ip + '/category/'+ url +'/article')
			.then(
				(res) => {
					console.log(this.state.data);

					this.setState({ data: res.data })
					this.setState({ check: true })

				},
				(err) => {
					console.log(err);
				})
	}


	render() {
		if (this.state.check) {
			return (
				<div>
					{/*<div className="mini-menu">*/}
					{/*	<h1>Menu</h1>*/}
					{/*	<ul>*/}
					{/*		{this.state.data.map((elem) => (*/}
					{/*			<li>*/}
					{/*				<Link to={`/article/${elem.id}`}>*/}
					{/*					{elem.title}*/}
					{/*				</Link>*/}
					{/*			</li>*/}
					{/*		))}*/}
					{/*	</ul>*/}
					{/*</div>*/}
					<div className="mini-menu">
						<h1>Item</h1>
						{this.state.data.map((elem, i) => (
							<ul key={i}>
								<li>
									<a href={'/article/' + elem.id}><h5>{elem.title}</h5></a>
								</li>
								<li>
									<h5>Description: </h5>
									<p> {elem.description} </p>
								</li>
							</ul>
						))}
					</div>
				</div>
			);
		} else {
			return <div></div>
		}
	}
}

export default Category;