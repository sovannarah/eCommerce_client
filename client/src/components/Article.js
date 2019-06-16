import React from 'react'; 
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../images/slider/stl-apx.jpg';
import Img2 from '../images/slider/apx.png';

import '../style/css/article.css'; 

const images = [
    {
        img: Img1
    },
    {
        img: Img2
    },
]
class Article extends React.Component {
    render() {
        return (
            <section className="d-flex h-100">      
                <div id="ctn-carousel" className="d-flex col-sm-7 h-100 w-100">
                    <Carousel className="w-100 mt-auto mb-auto">
                        {images.map((item, index) => (
                            <Carousel.Item key={index}>
                                <img className="w-100" src={item.img} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="col-sm-5 h-100 d-flex flex-column">
                    <div className="margin-art ml-auto mr-auto w-75">
                        <h1>SteelSeries</h1>
                        <h2>$210</h2>
                        <button>
                            <p>ADD TO CARD</p>
                        </button>
                        <h3>Apex Pro</h3>
                        <p>
                        La nouvelle génération de claviers mécaniques
                        L’Apex Pro représente le plus grand bond en avant en matière de claviers mécaniques depuis l’invention du 
                        switch mécanique il y a 35 ans. Chaque touche peut être réglée en fonction de votre niveau de sensibilité 
                        préféré, que ce soit pour le gaming, le travail ou autre chose. 
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Article;