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
                <Slider />
                <section className="bg-info mt-4 container">
                    
                </section>
            </section>
        )
    }
}

export default Home;