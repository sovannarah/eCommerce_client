import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Rtx from '../images/slider/dims.png';
import Chg90 from '../images/slider/GTX.png';
import Apex from '../images/slider/x570.png';

import '../style/css/article.css';
import '../style/css/slider.css';


const product = [
    {
        image: Rtx,
        title: 'Asus Rog',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum'
    },
    {
        image: Chg90,
        title: 'nVidia GTX',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    },
    {
        image: Apex,
        title: 'MSI x570',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
    }
]

class Slider extends React.Component {
    render() {
        return (
            <Carousel className="col-12">
                {product.map((item, index) => (
                    <Carousel.Item key={index}
                    className="h-100">
                        <div className="d-flex row h-100">
                            <div className="col-md-6 h-100 d-flex">
                                <img id="car-img" className="m-auto" src={item.image} />
                            </div>
                            <div className="col-md-6 h-100 d-flex">
                                <div className="col-10 mh-75 m-auto">
                                    <h1 className="text-secondary">{ item.title }</h1>
                                    <p className="text m-auto">{item.description}</p>
                                    <Link to="/">
                                        Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}

export default Slider;