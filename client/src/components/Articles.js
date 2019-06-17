import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../style/css/articles.css';

const ip = 'http://10.34.7.0:8001'

class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }

        axios.get( ip + '/article')
        .then(res => {
            const article = res.data;
            console.log(article);
            this.setState({articles : article})
        })
    }

    render() {
        return(
            <section id="ctn-articles" className="container-fluid d-flex">
                <div id="ctn-filter"> 
                </div>
                <ul className="col-12 row d-flex justify-content-center">
                    {this.state.articles.map((item, index) => (
                        <Link className="col-md-3 m-2 bg-light" to={`/article/${item.id}`} key={index}>  
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                            <p></p>
                        </Link>
                    ))}
                </ul>
            </section> 
        );
    }
}

export default Articles;