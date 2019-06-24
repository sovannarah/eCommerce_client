import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {FormControl} from 'react-bootstrap';


const apiArticleURI = 'http://localhost:8000/article/'; // TODO 'http://10.34.7.68:8000/article/';
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
		let allUpdated = true;
		getCart().forEach(
			(article) => {
				Axios.get(apiArticleURI + article.id)
					.then((res) => {
						const updatedArticle = {...article, erased: false, ...res.data};
						this.updateArticle(updatedArticle);
					})
					.catch((error) => {
						if (error.response && error.response.status === 404) {
							article.erased = true;
						} else {
							console.error(error);
							allUpdated = false;
						}
						this.updateArticle(article);
					});
			});
		this.setState({updated: allUpdated});
	}


	/**
	 * Replaces article in state with newArticle (by id), or adds if doesn't exist yet
	 * @param newArticle
	 */
	updateArticle = (newArticle) => {
		this.setState((state) => {
			const copy = state.articles.slice();
			const idx = copy.findIndex(old => old.id === newArticle.id);
			if (idx !== -1) {
				copy[idx] = newArticle;
			} else {
				copy.push(newArticle);
			}
			sessionStorage.setItem(storageKey, JSON.stringify(copy));
			return {articles: copy};
		});
	};

	/**
	 * Removes article from state by id, and updates sessionStorage
	 * @param id
	 */
	removeArticle = (id) => {
		this.setState((prevState) => {
			const articles = prevState.articles.filter(article => article.id !== id);
			sessionStorage.setItem(storageKey, JSON.stringify(articles));
			return {articles};
		});
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
						<th>Unit Price</th>
						<th>Qt.</th>
						<th>Stock</th>
					</tr>
					</thead>
					<tbody>
					{this.state
						.articles
						.map(article => <Article article={article}
												 delete={this.removeArticle}
												 update={this.updateArticle}/>,
						)}
					</tbody>
				</Table>
			</div>
		);
	}
}

function Article(props) {
	const {id, stock, title, price, erased, quantity} = props.article;
	const outOfStock = stock === 0;
	const stockStr = erased ?
		'NaN' :
		stock !== null ?
			stock :
			'unknown';
	return (
		<tr className={outOfStock ? 'disabled text-muted' : ''}>
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
			<td>{price}</td>
			<td>
				<FormControl type='number' min='0' max={stock}
							 disabled={outOfStock || erased}
							 onChange={(ev) => {
								 props.update({...props.article, quantity: ev.target.value});
							 }}
							 value={quantity}/>
			</td>
			<td>{stockStr}</td>
			<td>
				<Button variant='danger'
						className='material-icons'
						onClick={() => props.delete(id)}
				>
					delete
				</Button>
			</td>
		</tr>
	);
}


/**
 * @returns {Array}
 */
function getCart() {
	const json = sessionStorage.getItem(storageKey);
	return json ? JSON.parse(json) : [];
}

/**
 * Adds article to cart storage, or adds the quantity if it already exists
 * @param article
 * @param quantity
 */
function addToCart(article, quantity) {
	const cart = getCart();
	let existing = cart.find(oldArticle => oldArticle.id === article.id);
	if (!existing) {
		existing = article;
		existing.quantity = 0;
		cart.push(existing);
	}
	existing.quantity += quantity;
	sessionStorage.setItem(storageKey, JSON.stringify(cart));
}

export {Cart as default, addToCart};
