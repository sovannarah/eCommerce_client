import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../style/css/articles.css';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: []
        };
 const ip='http://127.0.0.1:8000';
        axios.get(ip+'/search')
            .then(res => {
                const search = res.data;
                console.log(search);
                this.setState({search : search})
            })
    }

    render() {
        console.log(this.state.search);
        return(
            <section id="ctn-articles" className="container-fluid d-flex">
                <div id="ctn-filter">
                </div>
                <ul className="col-12 row d-flex justify-content-center">
                    {this.state.search.map((item, index) => (
                        <Link className="col-md-3 m-2 bg-light" to='' key={index}>
                        </Link>
                    ))}
                </ul>
            </section> 
        );
    }
}
export default Search;