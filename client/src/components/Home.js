import React from 'react';
import Slider from './Slider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/css/home.css';

const ip = 'http://10.34.7.0:8001';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }

        axios.get(ip + '/article')
        .then(res=> {
            this.setState({ articles: res.data })
        })
    }

    render() {
        console.log(this.state.articles)
        return(
            <section id="home-stn" className="">
                {/* <Slider /> */}
                <section className="mt-4 container">
                    <div id="ctn-popular">
                        <h1 className="row d-flex justify-content-center">
                            the most
                        </h1>
                        <ul className="d-flex row justify-content-center col-12">
                            {this.state.articles.map((item, index) => (
                                 <Link id="popular-article" key={index} className="col-md-3 m-2" to={`/article/${ item.id }`} >
                                    <p>{ item.title }</p>
                                    <p>{ item.price }</p>
                                </Link>
                            ))}
                        </ul> 
                    </div>
                </section>
            </section>
        )
    }
}

export default Home;