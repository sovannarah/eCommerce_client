import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../style/css/slider.css';
import Rtx from '../images/slider/dims.png';
import Chg90 from '../images/slider/GTX.png';
import Apex from '../images/slider/x570.png';

import '../style/css/article.css';

const produit = [
    {
        image: Rtx,
        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum'
    },
    {
        image: Chg90,
        text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a'
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
                    className="h-100 ">
                        <div className="d-flex h-100">
                        <div className="col-md-6 h-100 d-flex">
                            <img id="car-img" className="m-auto" src={item.image} />
                        </div>
                        <div className="col-md-6 h-100 d-flex">
                            <p className="text m-auto">{item.text}</p>
                        </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}

export default Slider;