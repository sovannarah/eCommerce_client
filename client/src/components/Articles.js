import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/css/articles.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Arrow from '../images/icon/arow-r.png';

import Rtx from '../images/slider/asus-mouse.png';
import Chg90 from '../images/slider/apex.png';
import Apex from '../images/slider/cask-corsair.png';

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
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        id: '3',
        image: Apex,
        title: 'MSI x570',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        id: '4',
        image: Rtx,
        title: 'Asus Rog',
        price: '13',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum'
    },
    {
        id: '5',
        image: Chg90,
        title: 'nVidia GTX',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        id: '6',
        image: Apex,
        title: 'MSI x570',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        id: '7',
        image: Rtx,
        title: 'Asus Rog',
        price: '13',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum'
    },
    {
        id: '8',
        image: Chg90,
        title: 'nVidia GTX',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        id: '9',
        image: Apex,
        title: 'MSI x570',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        id: '10',
        image: Apex,
        title: 'MSI x570',
        price: '13',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    }
]




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
        console.log(this.state.articles);
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