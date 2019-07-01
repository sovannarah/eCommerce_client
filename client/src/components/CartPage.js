import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AddressForm from './Addresse/AddressForm';

import {FormControl} from 'react-bootstrap';
import '../style/css/cartPage.css';

const apiArticleURI = 'http://127.0.0.1:8000/article/';
const storageKey = 'cart';
let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];
const urlPos = FullUrl.split("/")[1];

class Cart extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			articles: [],
			updated: false,
			HT: 0,
			TTC: 0,
			fee: 0
		};

		this.displayAdress = this.displayAdress.bind(this);
	}

    componentDidMount() {
        let allUpdated = true;
        let copyPrice = this.state.HT;
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
                copyPrice += (article.price * article.quantity)
            }
        );
        this.setState({updated: allUpdated});
        this.setState({HT: copyPrice});
    }



	displayAdress() {
		document.getElementById("ctn-adress").classList.toggle('display-adress');
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

    /**
     * TODO: understand how transport fee will work
     */
    calculateTranFee = () => {
        // $this.setState({fee: 20});
        return (20);
    };

    render() {
        return (
            <section id="ctn-cartPage" className=" min-vh-100 flex-column container-fluid d-flex">
                <div id="ctn-cart" className="col-md-9 m-auto ">
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

                        {this.state.articles.map((article, index) =>
                            <>
                                <Article key={index} article={article}
                                         delete={this.removeArticle}
                                         update={this.updateArticle}
                                />
                            </>
                        )}
                        </tbody>

						
					</Table>
					<div className="col-md-12 mb-3 text-light bg-grey2 p-3">
						<div className="d-flex justify-content-between pl-2 pr-2 border-bottom">
							<h2>Localisation</h2>
							<h4 onClick={this.displayAdress}>Add Adress</h4>
						</div>
					</div>
                    <div className="container">
                        <AddressForm/>
                    </div>
                    <div className="d-flex bg-grey2 justify-content-between w-100">
                        <h5 className="text-light mt-auto mb-auto ml-3">SOUS TOTAL : {this.state.HT}</h5>
                    </div>
                    <div className="d-flex bg-grey2 justify-content-between w-100">
                        <h5 className="text-light mt-auto mb-auto ml-3">TRANSPORT FEE : </h5>
                    </div>
                    <div className="d-flex bg-grey2 justify-content-between w-100">
                        <h5 className="text-light mt-auto mb-auto ml-3">TOTAL PRICE : {this.state.HT}</h5>
                        <Link to="/checkin">
                            <button className="btn-mainly mr-2 mt-2 mb-2">PAY</button>
                        </Link>
                    </div>
                </div>

            </section>
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
            <td>{price}</td>
            <td>
                <FormControl type='number'
                             className="text-dark"
                             placeholder={quantity}
                             min='0' max={stock}
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
