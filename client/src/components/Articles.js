import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../style/css/articles.css';

const ip = 'http://127.0.0.1:8000';

class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };

        axios.get(ip + '/article')
            .then(res => {
                const article = res.data;
                console.log(article);
                this.setState({articles: article})
            })
    }

    render() {
        return (
            <section id="ctn-articles" className="container-fluid d-flex">
                <div id="ctn-filter">
                </div>
                <ul className="container-fluid ml-auto mr-auto col-lg-8">
                        {this.state.articles.map((item, index) => (
                            <div key={index} className=" ctn-art bg-light mt-4 mb-4 w-100">
                                <Link className="d-flex h-100" to={`/article/${item.id}`}>
                                    <div className="ctn-image h-100 mt-auto mb-auto col-3 d-flex">
                                        {item.images.length > 0 ? 
                                            <img id="popular-img" className="m-auto"
                                                src={ip + "/uploads/images/" + item.images[0]} alt=""/>
                                        : 
                                            <img id="popular-img" className="m-auto"
                                            src={require("../images/icon/none.png")} alt=""/> 
                                        }
                                    </div>
                                    <div className="p-3">
                                        <h5>{item.title}</h5>
                                        <p>${item.price}</p>
                                        <p>{item.description}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </ul>
            </section>
        );
    }
}

export default Articles;