import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../style/css/slider.css';
import Rtx from '../images/slider/rtx.jpg';
import Chg90 from '../images/slider/chg90.jpg';
import Apex from '../images/slider/apex.jpg';

import '../style/css/article.css';

const produit = [
    {
        image: Rtx,
        text: '1'
    },
    {
        image: Chg90,
        text: '2'
    },
    {
        image: Apex,
        text: '3'
    }
]

class Slider extends React.Component {
    render() {
        return (
            <Carousel className="col-12">
                {produit.map((item, index) => (
                    <Carousel.Item key={index}
                    className="h-100"
                    style={{ background: `url('${item.image}') no-repeat center center` }}>
                        {item.text}
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}

export default Slider;