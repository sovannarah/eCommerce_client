import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {addToCart} from './Cart';
import axios from 'axios';
import '../style/css/article.css';

const ip = 'http://127.0.0.1:8000';


class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            add: '',
            quantity: 1
        };
        let id = this.props.match.params.id;
        axios.get(ip + '/article/' + id)
            .then(res => {
                this.setState({article: res.data})
            });
        axios.put(ip + '/article/' + id + '/increment');
        this.setQuantity = this.setQuantity.bind(this);
    }

    addCart = (event) => {
        addToCart(this.state.article, this.state.quantity);
        window.location.replace("/article/" + this.props.match.params.id)
    };

    async setQuantity(event) {
        if (event.target.name === 'quantity')
            await this.setState({quantity: event.target.valueAsNumber});
    }


    render() {
        console.log(this.state.quantity)
        const article = this.state.article;
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
                                        <img id="car-img" className="m-auto mw-100 mh-100" src={ip + "/uploads/images/" + article.images[index]} alt=""/>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))
                        :
                        <img id="car-img" className="m-auto mw-100 mh-100"
                                                src={require("../images/icon/none.png")} />
                        }
                    </Carousel>
                </div>
                <div id="ctn-infoArticle" className="col-lg-6 bg-light m-auto d-flex flex-column">
                    <div className="scroll margin-art ml-auto d-flex flex-column mr-auto">
                        <div className="mt-5 mb-5">
                            <h1>{article.title}</h1>
                            <h2>$ {article.price}</h2>
                        </div>
                        <div>
                            <p>stock : {article.stock}</p>
                            <input type="number" name="quantity" min="1" value={this.state.quantity} max={article.stock} onChange={this.setQuantity}/>
                            <button className="d-flex mt-3" onClick={this.addCart}>
                                <p className="m-auto">ADD TO CARD</p>
                            </button>
                        </div>
                        <div className="mt-3 mb-4">
                            
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
