import React from 'react';
import Slider from './Slider';
import axios from 'axios';
import IconPc from '../images/icon/icone-pc-wi.png';
import IconCG from '../images/icon/icone-cgi.png';
import IconMouse from '../images/icon/icone-mouse-wi.png';
import Rtx from '../images/slider/asus-mouse.png';
import Chg90 from '../images/slider/apex.png';
import Apex from '../images/slider/cask-corsair.png';
import { Link } from 'react-router-dom';
import '../style/css/home.css';

const ip = 'http://10.34.7.0:8001';

const product = [
    {
        image: Rtx,
        title: 'Asus Rog',
        price: '13',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum'
    },
    {
        image: Chg90,
        title: 'nVidia GTX',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        image: Apex,
        title: 'MSI x570',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    }
]

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
                <section className="container-fluid">
                    <div id="ctn-categorie" className="row bg-blackgrey d-flex justify-content-center">
                        <Link to="/" className="d-flex flex-column ctn-categorie m-1 bg-info">
                            <img src={ IconCG } />
                            <p>Composants</p>
                        </Link>
                        <Link to="/" className="d-flex flex-column ctn-categorie m-1 bg-info">
                            <img src={ IconMouse } />
                            <p>Peripheriques</p>
                        </Link>
                        <Link to="/" className="d-flex flex-column ctn-categorie m-1 bg-info">
                            <img src={ IconPc } />
                            <p>PC et Ordinateurs</p>
                        </Link>
                        <Link to="/" className="d-flex flex-column ctn-categorie m-1 bg-info">
                            <img src={ IconCG } />
                            <p>Composants</p>
                        </Link>
                    </div>
                    <div className="bg-black">
                        <h3 className="row d-flex justify-content-center">Most popular</h3>
                        <div className="d-flex justify-content-center">
                        <div className="container d-flex justify-content-center row">
                            {product.map((item, index) => (
                                <div className="ctn-popular col-md-4">
                                    <h3 className=" bg-light">{item.title}</h3>
                                    <div className="ctn-img d-flex">
                                        <img id="popular-img" className="m-auto" src={item.image} />
                                    </div>
                                    <p>{item.price}</p>
                                </div>
                            ))}
                        </div> 
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default Home;