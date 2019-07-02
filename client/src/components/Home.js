import React from 'react';
import Slider from './Slider';
import axios from 'axios';
import IconPc from '../images/icon/icone-pc-wi-hee.png';
import IconCG from '../images/icon/icone-cgi-hee.png';
import IconMouse from '../images/icon/icone-mouse-wi-hee.png';
import IconAcc from '../images/icon/icone-acc-wi-hee.png';
import { Link } from 'react-router-dom';
import '../style/css/home.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const ip = 'http://127.0.0.1:8000';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            category: []
        };

        axios.get(ip + '/article')
            .then((res) => {
                this.setState({articles: res.data});
            });

        axios.get(ip + '/category')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.state.category.push(res.data[i].id)
                }
            })
    }

    render() {
        return (
            <section id="home-stn" className="">
                <Slider/>
                <section className="container-fluid">
                    <div id="ctn-categorie" className="row">
                        <div id="case-categorie" className="col-lg-3 d-flex bg-mainly row">
                            <h1 className="m-auto">Categories</h1>
                        </div>
                        <div id="ctn-iconCat" className="row d-flex col-md-9 justify-content-center">
                            <div>
                                <Link to={`/category/1`} className="d-flex flex-column ctn-categorie">
                                    <img src={ IconCG } alt=""/>
                                </Link>
                                <span className="span-none d-flex flex-column ctn-categorie">
                                </span>
                            </div>
                            <div>
                                <span className="d-flex flex-column ctn-categorie ">
                                </span>
                                <Link to={`/category/2`} className="d-flex flex-column ctn-categorie">
                                    <img className="align-r" src={ IconMouse } alt=""/>
                                </Link>
                            </div>
                            <div>
                                <Link to={`/category/3`} className="d-flex flex-column ctn-categorie">
                                    <img src={ IconPc } alt=""/>
                                </Link>
                                <span className="d-flex flex-column ctn-categorie ">
                                </span>
                            </div>
                            <div>
                                <span className=" span-none d-flex flex-column ctn-categorie">
                                </span>
                                <Link to={`/category/4`} className="d-flex flex-column ctn-categorie">
                                    <img className="align-r" src={ IconAcc } alt=""/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="ctn-popular" className="row bg-grey justify-content-center">
                        <h2 className="d-flex justify-content-center w-100 m-5">Most Popular</h2>
                        <div className="mb-5 d-flex row justify-content-around ">
                            {this.state.articles.slice(0, 10).map((item, index) => (
                                <Card key={index} className="ctn-popular m-3 col-md-4">
                                    <Link to={`/article/${item.id}`}>
                                        <CardActionArea className="h-100">
                                            <div className="ctn-img d-flex">
                                            {item.images.length > 0 ? 
                                                <img id="popular-img" className="m-auto"
                                                src={ip + "/uploads/images/" + item.images[0]}/>
                                            :
                                                <img id="popular-img" className="m-auto"
                                                src={require("../images/icon/none.png")} />    
                                            }
                                            </div>
                                            <CardContent className="mt-auto">
                                                <Typography>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {item.description}
                                                </Typography>
                                                <Typography>
                                                    {`$${item.price}`}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

export default Home;