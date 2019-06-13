import React from 'react';
import Slider from 'react-animated-slider';
import Description from './Description';
import '../style/css/home.css';
import '../style/css/slider.css'
import '../style/css/description.css';
import TheSent from '../img/WANTED/TheSentIntense.png';
import Intense from '../img/WANTED/DHI.png';
import Code from '../img/WANTED/Code.png';
import Million from '../img/WANTED/81009.png';
import Nuit from '../img/WANTED/laNuit.png';
import ArrowR from '../img/icon/arrow-RW.png';
import Circle from '../img/icon/circle.png';

const produit = [
    {
        brand: 'BOSS',
        sndName: 'The Sent Intense',
        description: 'Decouvrez une seduction si intense qu\'elle vous embrase : mettew vos sens en emoi avec BOSS THE SCENT INTENSE, un jus aphrodisiaque dans un flacon de parfum....',
        prix: '72,-',
        image: TheSent
    },
    {
        brand: 'DIOR',
        sndName: 'Intense',
        description: 'Decouvrez une seduction si intense qu\'elle vous embrase : mettew vos sens en emoi avec BOSS THE SCENT INTENSE, un jus aphrodisiaque dans un flacon de parfum....',
        prix: '84,-',
        image: Intense
    },
    {
        brand: 'ARMANI',
        sndName: 'Code',
        description: 'Decouvrez une seduction si intense qu\'elle vous embrase : mettew vos sens en emoi avec BOSS THE SCENT INTENSE, un jus aphrodisiaque dans un flacon de parfum....',
        prix: '67,-',
        image: Code
    },
    {
        brand: 'PACO RABANNE',
        sndName: '1Million',
        description: 'Decouvrez une seduction si intense qu\'elle vous embrase : mettew vos sens en emoi avec BOSS THE SCENT INTENSE, un jus aphrodisiaque dans un flacon de parfum....',
        prix: '79,-',
        image: Million
    },
    {
        brand: 'YVES SAINT LAURENT',
        sndName: 'La Nuit de L\'Homme',
        description: 'Decouvrez une seduction si intense qu\'elle vous embrase : mettew vos sens en emoi avec BOSS THE SCENT INTENSE, un jus aphrodisiaque dans un flacon de parfum....',
        prix: '108,-',
        image: Nuit
    },
]

const content = [
    {
        title: 'BOSS',
        sndName: 'The Sent Intense',
        description:
            'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
        price: '79,-',
        image: TheSent,
        user: 'Luan Gjokaj',
        userProfile: 'https://i.imgur.com/JSW6mEk.png'
    },
    {
        title: 'DIOR',
        sndName: 'Intense',
        description:
            'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
        price: '108,-',
        image: Intense,
        user: 'Erich Behrens',
        userProfile: 'https://i.imgur.com/0Clfnu7.png'
    },
    {
        title: 'ARMANI',
        sndName: 'Code',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        price: '121,-',
        image: Code,
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    },
    {
        title: 'PACO RABANNE',
        sndName: '1Million',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        price: '68,-',
        image: Million,
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    },
    {
        title: 'YVES SAINT LAURENT',
        sndName: 'La Nuit de L\'Homme',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        price: '81,-',
        image: Nuit,
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    }
];


class Home extends React.Component {

    onButtonClick() {
        //if (this.props.onOpen)
          //  return this.props.onOpen(item)
        //console.error('onOpen is undefined')
        document.getElementById('desc').classList.toggle('descopen')
    };

    render() {
        return (
            <section className="stn-home">
                <Slider className="slider-wrapper">
                    {content.map((item, index) => (
                        <div
                            key={index}
                            className="slider-content"
                        >
                            <div className="inner">
                                <h1 className="brand">{item.title}</h1>
                                <div>
                                    <span className="deco-barre"></span>
                                    <h3 className="sndName">
                                        {item.sndName}
                                    </h3>
                                    <span className="deco-barre"></span>
                                </div>
                                <p>{item.description}</p>
                                <button onClick={this.onButtonClick}>
                                    <span className="details">
                                        Details
										<img className="arrowR" src={ArrowR}></img>
                                    </span>
                                </button>
                            </div>
                            
                            <div className="currImg">
                                <img src={item.image}></img>
                            </div>
                            <div className="ctn-1">
                                <div className="ctn-price d-flex">
                                    <p>dollars</p>
                                    <h1>{item.price}</h1>
                                </div>
                                <div className="ctn-ctrl d-flex justify-content-between">
                                    <p>previous fragrance</p>
                                    <img className="icon-circle" src={Circle} />
                                    <p>next fragrance</p>
                                </div>
                            </div>
                            <Description 
                            brand={item.title}
                            sndName={item.sndName}
                            price={item.price}
                            description={item.description}/>
                        </div>
                        
                    ))}
                </Slider>
            </section>
        );
    }
}

export default Home;

