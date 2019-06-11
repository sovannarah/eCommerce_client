import React from 'react';
import Slider from 'react-animated-slider';
import '../style/css/home.css';
import '../style/css/slider.css'
import TheSent from '../img/WANTED/TheSentIntense.png';
import Intense from '../img/WANTED/DHI.png';
import Code from '../img/WANTED/Code.png';
import Million from '../img/WANTED/81009.png';
import Nuit from '../img/WANTED/laNuit.png';

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
		description:
		'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
		button: 'Read More',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
		user: 'Luan Gjokaj',
		userProfile: 'https://i.imgur.com/JSW6mEk.png'
	},
	{
		title: 'DIOR',
		description:
		'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
		button: 'Discover',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
		user: 'Erich Behrens',
		userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
		title: 'ARMANI',
		description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
		button: 'Buy now',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
    },
    {
		title: 'PACO RABANNE',
		description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
		button: 'Buy now',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
    },
    {
		title: 'YVES SAINT LAURENT',
		description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
		button: 'Buy now',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];


class Home extends React.Component {

    render() {
        return (
            <section className="stn-home">
                {/* <Slider className="slider-wrapper">
                    {produit.map((item, index) => (
                        <div key={index} className="slider-content">
                            <img className="m-auto" src={item.image}></img>
                        </div>
                    ))}
                </Slider> */}

<Slider className="slider-wrapper">
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					// style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
						<h1 class="brand">{item.title}</h1>
						<p>{item.description}</p>
						<button>{item.button}</button>
					</div>
					<section>
						<img src={item.userProfile} alt={item.user} />
						<span>
							Posted by <strong>{item.user}</strong>
						</span>
					</section>
				</div>
			))}
		</Slider>
            </section>
        );
    }
}

export default Home;

