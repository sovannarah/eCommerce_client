import React from 'react';


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

class Articles extends React.Component {
    
    render() {
        return(
            <section className="stn-articles">
                <div className="row">
                    {content.map((item, index) => (
                        <div  key={index} className="col-3 article">
                            <div key={index} className="ctn-img d-flex">
                            </div>
                            <div className="ctn-brand">
                                <p>{ item.title }</p>
                            </div>
                            <div className="ctn-sndName">
                                <p>{ item.sndName }</p>
                            </div>
                            <div className="ctn-pricee">
                                <p>{ item.price }</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}

export default Articles;