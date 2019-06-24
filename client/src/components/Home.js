import React from 'react';
import Slider from './Slider';
import axios from 'axios';
import IconPc from '../images/icon/icone-pc-wi-he.png';
import IconCG from '../images/icon/icone-cgi-he.png';
import IconMouse from '../images/icon/icone-mouse-wi-he.png';
import Rtx from '../images/slider/asus-mouse.png';
import Chg90 from '../images/slider/apex.png';
import Apex from '../images/slider/cask-corsair.png';
import { Link } from 'react-router-dom';
import '../style/css/home.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const ip = 'http://127.0.0.1:8000';

const product = [
    {
        id: '1',
        image: Rtx,
        title: 'Asus Rog',
        price: '13',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum'
    },
    {
        id: '2',
        image: Chg90,
        title: 'nVidia GTX',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a',
    },
    {
        id: '3',
        image: Apex,
        title: 'MSI x570',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a',
    },
];

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
        };

        axios.get(ip + '/article')
        .then((res) => {
            this.setState({ articles: res.data});
        });
    }

    render() {
        console.log(this.state.articles);
        return (
            <section id="home-stn" className="">
                <Slider />
                <section className="container-fluid">
                    <div id="ctn-categorie" className="row">
                        <div id="case-categorie" className="col-lg-3 d-flex bg-mainly row">
                            <h1 className="m-auto">Categories</h1>
                        </div>
                        <div id="ctn-iconCat" className="row d-flex col-md-9 justify-content-center">
                            <div>
                                <Link to="/" className="d-flex flex-column ctn-categorie">
                                    <img src={ IconCG } />
                                </Link>
                                <span className="d-flex flex-column ctn-categorie">
                                </span>
                            </div>
                            <div>
                                <span className="d-flex flex-column ctn-categorie ">
                                </span>
                                <Link to="/" className="d-flex flex-column ctn-categorie">
                                    <img className="align-r" src={ IconMouse } />
                                </Link>
                            </div>
                            <div>
                                <Link to="/" className="d-flex flex-column ctn-categorie">
                                    <img src={ IconPc } />
                                </Link>
                                <span className="d-flex flex-column ctn-categorie ">
                                </span>
                            </div>
                            <div>
                                <span className="d-flex flex-column ctn-categorie">
                                </span>
                                <Link to="/" className="d-flex flex-column ctn-categorie">
                                    <img className="align-r" src={ IconCG } />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="ctn-popular" className="row bg-grey justify-content-center">
                        <h2 className="d-flex justify-content-center w-100 m-5">Most Popular</h2>
                        <div className=" d-flex row justify-content-around ">
                            {product.map((item, index) => (
                                <Card key={index} className="ctn-popular m-3 col-md-4">
                                    <Link to="">
                                        <CardActionArea>
                                            <CardHeader
                                                title={item.title}
                                                subheader={`$${item.price}`}
                                            />
                                            <div className="ctn-img d-flex">
                                                <img id="popular-img" className="m-auto" src={item.image} />
                                            </div>
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    { item.description }
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