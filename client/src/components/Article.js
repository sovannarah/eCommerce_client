import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../images/slider/asus-mouse.png';
import Img2 from '../images/slider/m-spartha.png';
import Img3 from '../images/slider/spartha-m.png';
import {addToCart } from './Cart'
import axios from 'axios';
// import {addToCart} from './Cart';
import '../style/css/article.css';
const ip = 'http://127.0.0.1:8000';


class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            add: ''
        }
        var id = this.props.match.params.id;
        axios.get(ip + '/article/' + id)
            .then(res => {
                this.setState({ article: res.data })
            })
    }

    addCart = (event) => {
    	addToCart(this.state.article);
        console.log(this.state.article);

    }

    render() {
        const article = this.state.article;
        return (
            <section className="d-flex h-100">
                <div id="ctn-carousel" className="d-flex col-sm-6 h-100 w-100">
                    <Carousel className="w-100 mt-auto mb-auto">
                        {/*{images.map((item, index) => (*/}
                        {/*    <Carousel.Item key={index}*/}
                        {/*        className="h-100 w-100">*/}
                        {/*        <div className="d-flex row w-100 h-100">*/}
                        {/*            <div id="ctn-img-car" className="col-md-12 m-auto  h-100 w-100 d-flex">*/}
                        {/*                <img id="car-img" className="m-auto" src={item.img} />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </Carousel.Item>*/}
                        {/*))}*/}
                    </Carousel>
                </div>
                <div className="col-sm-6 h-100 d-flex flex-column">
                    <div className="margin-art ml-auto mr-auto w-75">
                        <h1>{article.title}</h1>
                        <p>stock : {article.stock}</p>
                        <h2>$ {article.price}</h2>
                        <button>
                            <p>ADD TO CARD</p>
                        </button>
                        <h5>DESCRIPTION</h5>
                        <p>{article.description}</p>
	                    <img alt="articleimg" src={ article.img }/>
                    </div>
                </div>
            </section>
        );
    }
}

export default Article;