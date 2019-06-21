import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const apiArticleURI = 'http://10.34.7.68:8000/article/';
const storageKey = 'cart';

class Cart extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			articles: [],
			updated: false,
		};
	}


	componentDidMount() {
		readCart().forEach(
			(article, index) => {
				let allUpdated = true;
				Axios.get(apiArticleURI + article.id)
					.then(res => this.updateArticle(index, res.data))
					.catch((error) => {
						if (error.response && error.response.status === 404) {
							article.erased = true;
						} else {
							console.error(error);
							allUpdated = false;
						}
						this.updateArticle(index, article);
					});
				this.setState({updated: allUpdated});
			});
	}


	updateArticle = (index, newArticle) => {
		this.setState((state) => {
			const copy = state.articles.slice();
			copy[index] = newArticle;
			return {articles: copy};
		});
	};

	removeArticle = (id) => {
		this.setState((state) => {
			return {articles: state.articles.filter(article => article.id !== id)};
		});
		sessionStorage.setItem(storageKey, JSON.stringify(this.state.articles));
	};

	render() {
		return (
			<div className='cart'>
				<h3>My Cart</h3>
				{
					!this.state.updated
					&& <Alert variant='warning'>
						Server unavailable: some info may be outdated
					</Alert>
				}
				<Table variant='dark'>
					<thead>
					<tr>
						<th>Name</th>
						<th>stock</th>
					</tr>
					</thead>
					<tbody>
					{this.state
						.articles
						.map(article => <Article article={article}
												 delete={this.removeArticle}/>,
						)}
					</tbody>
				</Table>
			</div>
		);
	}
}

function Article(props) {
	const {id, stock, title, erased} = props.article;
	const outOfStock = stock === 0;
	const stockStr = erased ?
		'NaN' :
		stock !== null ?
			stock :
			'unknown';
	return (
		<tr className={outOfStock ? 'disabled' : ''}>
			<td>
				{!erased ?
					<Link to={`/article/${id}`}
						  disabled={outOfStock}
					>
						{title}
					</Link> :
					<span className='text-muted'>
						(No longer available) {title}
					</span>
				}
			</td>
			<td>{stockStr}</td>
			<td>
				<Button variant='danger'
						onClick={() => props.delete(id)}
				>
					Del
				</Button>
			</td>
		</tr>
	);
}


function readCart() {
	const json = sessionStorage.getItem(storageKey);
	return json ? JSON.parse(json) : [];
}


function addToCart(article) {
	const cart = readCart();
	cart.push(article);
	sessionStorage.setItem(storageKey, JSON.stringify(cart));
}

export {Cart as default, addToCart};
