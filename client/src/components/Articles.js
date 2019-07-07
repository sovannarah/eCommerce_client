import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../style/css/articles.css';
import Scrapper from './Scrapper'
// const ip = 'http://10.34.7.68:8001';
//const ip = 'http://127.0.0.1:8000';
//const ip = 'http://10.34.7.0:8000';
const ip = 'http://10.41.176.52:8001';


class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            scraps: [[]]
        };
        this.getScrapper = this.getScrapper.bind(this);
        axios.get(ip + '/article')
            .then(res => {
                const article = res.data;
                console.log(article);
                this.setState({articles: article});
                this.getScrapper(res.data);
            })
    }

    async getScrapper(tarticle) {
        let c = -1;
        while (tarticle[++c]) {
            let scrapget = await Scrapper.getBetter(tarticle[c].title, tarticle[c].price);
            let scrapst = this.state.scraps;
            scrapst[c] = scrapget;
            this.setState({scraps: scrapst});
        }
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
                                             src={ip + "/uploads/images/" + item.images[0]}/>
                                        :
                                        <img id="popular-img" className="m-auto"
                                             src={require("../images/icon/none.png")}/>
                                    }
                                </div>
                                <div className="p-3">
                                    <h5>{item.title}</h5>
                                    <p>${item.price}</p>
                                    <p>{item.description}</p>
                                </div>
                                {this.state.scraps[index].length > 0 ?
                                    this.state.scraps[index].map((conc, i) =>
                                        <ul key={'getscrap' + i} className={"bg-light"}>
                                            <p>{conc}</p>
                                        </ul>
                                    )
                                    : ''}
                            </Link>

                        </div>
                    ))}
                </ul>
            </section>
        );
    }
}

export default Articles;