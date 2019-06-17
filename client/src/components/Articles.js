import React from 'react';
import axios from 'axios';

class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }

        axios.get('http://127.0.0.1:8000/login')
        .then(res => {
            const articles = res.data;
            console.log(articles);
        })
    }

    render() {
        return(
            <section>
                
            </section> 
        );
    }
}

export default Articles;