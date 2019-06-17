import React from 'react'; 
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../images/slider/stl-apx.jpg';
import Img2 from '../images/slider/apx.png';
import axios from 'axios';
import '../style/css/article.css'; 
const ip = 'http://10.34.7.0:8001';

const images = [
    {
        img: Img1
    },
    {
        img: Img2
    },
]
class Article extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            article : {}
        }
        var id = this.props.match.params.id;
        axios.get(ip + '/article/' +id)
        .then(res => {
            console.log(res.data)
            this.setState({ article : res.data })
        })
    }
    
    render() {
        const article = this.state.article;
        console.log(article)
        return (
            <section className="d-flex h-100">      
                <div id="ctn-carousel" className="d-flex col-sm-7 h-100 w-100">
                    <Carousel className="w-100 mt-auto mb-auto">
                        {images.map((item, index) => (
                            <Carousel.Item key={index}>
                                <img className="w-100" src={item.img} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="col-sm-5 h-100 d-flex flex-column">
                    <div className="margin-art ml-auto mr-auto w-75">
                        <h1>{ article.title }</h1>
                        <p>stock : { article.stock }</p>
                        <h2>$ { article.price }</h2>
                        <button>
                            <p>ADD TO CARD</p>
                        </button>
                        <h5>DESCRIPTION</h5>
                        <p>{article.description}</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Article;