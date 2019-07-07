import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {FormControl} from 'react-bootstrap';

// const apiArticleURI = 'http://10.34.7.68:8001/article/';
const apiArticleURI = 'http://127.0.0.1:8000/article/';
const storageKey = 'cart';
// const ip = 'http://10.34.7.0:8000';
const ip = 'http://127.0.0.1:8000';

class Cart extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            articles: [],
            updated: false,
        };
    }


	componentDidMount() {
		const articles = getArticles();
        this.setState({articles});
		let allUpdated = true;
		articles.forEach(
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
            <div className='cart w-100'>
                <h3 className="text-secondary">My Cart</h3>
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
                        .map((article, index) => <Article key={index} article={article}
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
    const {id, stock, title, price/*, variante*/, erased, quantity} = props.article;
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
                    <Link className="text-light" to={`/article/${id}`}
                          disabled={outOfStock}
                    >
                        {title}
                    </Link> :
                    <span className='text-muted'>
						(No longer available) {title}
					</span>
                }
            </td>
            <td>{price /*+ variante.var_price*/}</td>
            <td>
                <FormControl type='number'
                             className="text-dark"
                             value={quantity}
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
function getArticles() {
	const json = sessionStorage.getItem(storageKey);
	return json ? JSON.parse(json) : [];
}

/**
 * Adds article to cart storage, or adds the quantity if it already exists
 * @param article
 * @param quantity
 */
function addToCart(article, quantity/*, variante*/)
{
	const cart = getArticles();
	let existing = cart.find(oldArticle => oldArticle.id === article.id);
	if (!existing) {
		existing = article;
		existing.quantity = 0;
		// existing.variante = variante;
		cart.push(existing);
	}
	existing.quantity = quantity;
    sessionStorage.setItem(storageKey, JSON.stringify(cart));
}

export {Cart as default, addToCart};
