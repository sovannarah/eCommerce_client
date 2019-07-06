import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {addToCart} from './Cart';
import axios from 'axios';
import '../style/css/article.css';
import Scrapper from './Scrapper';

// const ip = 'http://10.34.7.68:8001';
//const ip = 'http://127.0.0.1:8000';
const ip = 'http://10.34.7.0:8000';


class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            add: '',
            quantity: 0,
            showME: false,
            price: 0,
            scrap: [],
            variantId: null
        };
        this.getScrapper = this.getScrapper.bind(this);
    }

    async getScrapper() {
        let scraps = await Scrapper.getBetter(
            this.state.article.title, this.state.article.price);
        this.setState({scrap: scraps});
        console.log(this.state.scrap);
    }

    async componentDidMount() {
        let id = this.props.match.params.id;

        await axios.get(ip + '/article/' + id)
            .then(res => {
                this.setState({article: res.data});
                this.setState({price: res.data.price});
                let variant = res.data.variants.couleur;
                console.log(variant);

                if (variant != undefined && variant.length >= 1) {
                    this.setState({
                        showME: true
                    });

                }
            });
        this.getScrapper();
        await axios.put(ip + '/article/' + id + '/increment');
        this.setQuantity = this.setQuantity.bind(this);

    }

    addCart = (event) => {
        let variant = this.state.article.variants.couleur;
        console.log(variant);

        let variantSelected = variant.find(item => item.id == this.state.variantId);
        alert(JSON.stringify(variantSelected));

        if (variant !== undefined && variant.length >= 1 && variantSelected !== undefined) {
            addToCart(this.state.article, this.state.quantity, variantSelected);
            window.location.replace("/article/" + this.props.match.params.id);
        } else {
            addToCart(this.state.article, this.state.quantity);
            window.location.replace("/article/" + this.props.match.params.id);
        }
    };

    async setQuantity(event) {
        if (event.target.name === 'quantity')
            await this.setState({quantity: event.target.valueAsNumber});
    }

    variantePrice = (event) => {
        let colorPrice = event.target.value;
        let oldPrice = this.state.article.price;

        let newPrice = parseInt(oldPrice) + parseInt(colorPrice);
        this.setState({price: newPrice});
        this.setState({variantId: event.target.options[event.target.selectedIndex].dataset.id})
        console.log(this.state.variantId);


        // console.log(event.target.options[event.target.selectedIndex].dataset.id);
    }


    render() {
        //console.log(Object.keys(this.state.article.variants));
        const article = this.state.article;
        const price = this.state.price;
        if (Object.keys(article).length === 0) {
            return null;
        }

        return (
            <section id="stn-article" className="d-flex row">
                <div id="ctn-carousel" className="d-flex col-lg-6 h-100 w-100">
                    <Carousel className="w-100 h-100 m-auto">
                        {article.images.length > 0 ?
                            article.images.map((item, index) => (
                                <Carousel.Item key={index}
                                               className="h-100 w-100">
                                    <div className="d-flex row w-100 h-100">
                                        <div id="ctn-img-car" className="col-md-12 m-auto mh-100 mw-100 d-flex">
                                            <img id="car-img" className="m-auto mw-100 mh-100"
                                                 src={ip + "/uploads/images/" + article.images[index]} alt=""/>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))
                            :
                            <img id="car-img" className="m-auto mw-100 mh-100"
                                 src={require("../images/icon/none.png")}/>
                        }
                    </Carousel>
                </div>
                <div id="ctn-infoArticle" className="col-lg-6 bg-light m-auto d-flex flex-column">
                    <div className="scroll margin-art ml-auto d-flex flex-column mr-auto">
                        <p>Better on: </p>
                        {this.state.scrap.map((data, i) =>
                            <ul key={'scrap' + i}>
                                <pre>{data}</pre>
                            </ul>
                        )}
                        <div className="mt-5 mb-5">
                            <h1>{article.title}</h1>
                            <h2>$ {price}</h2>
                        </div>
                        <div className="variant">
                            {
                                this.state.showME ?
                                    <select className="form-control col-sm-2" onChange={this.variantePrice}>
                                        <option value={0}>original</option>
                                        {this.state.article.variants.couleur.map((elem, index) => (
                                            <option data-id={elem.id} key={index}
                                                    value={elem.var_price}>{elem.spec}</option>
                                        ))}
                                    </select>
                                    : null
                            }
                        </div>
                        <div>
                            <p>stock : {article.stock}</p>
                            <input type="number" name="quantity" min="1" value={this.state.quantity} max={article.stock}
                                   onChange={this.setQuantity}/>
                            <button className="d-flex mt-3" onClick={this.addCart}>
                                <p className="m-auto">ADD TO CARD</p>
                            </button>
                        </div>
                        <div className="mt-5 mb-4">
                            <input type="number" name="quantity" max={article.stock} onChange={this.setQuantity}/>
                            <h5 className="mt-5">DESCRIPTION</h5>
                            <p className="col-8">{article.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}

export default Article;
