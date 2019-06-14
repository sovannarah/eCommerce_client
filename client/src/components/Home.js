import React from 'react';
import Slider from 'react-animated-slider';
// import Description from './Description';
// import '../style/css/home.css';
// import '../style/css/slider.css'
// import '../style/css/description.css';
import TheSent from '../img/WANTED/TheSentIntense.png';
import Intense from '../img/WANTED/DHI.png';
import Code from '../img/WANTED/Code.png';
import Million from '../img/WANTED/81009.png';
import Nuit from '../img/WANTED/laNuit.png';
import ArrowR from '../img/icon/arrow-RW.png';
import Circle from '../img/icon/circle.png';


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

   

    render() {
        return (
            <section className=" container ">     
                    {content.map((item, index) => (
                        <div key={ index } className="m-auto">
                            <p>{ item.title }</p>
                        </div> 

                    ))}
            </section>
        );
    }
}

export default Home;

