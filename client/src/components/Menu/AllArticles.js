import React from 'react';
import { Link } from 'react-router-dom';
// import '../style/css/';
import axios from 'axios';


const content = [
    {
        title: 'PACO RABANNE',
        sndName: '1Million',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        price: '68,-',
        image: 'Million',
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    },
    {
        title: 'YVES SAINT LAURENT',
        sndName: 'La Nuit de L\'Homme',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        price: '81,-',
        image: 'Nuit',
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    }
];
class AllArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: [],
        }

    }
    async componentDidMount() {
     
        await axios.get('http://10.34.7.0:8001/categories')
            .then(
                (res) => {
                    this.state.data = res.data[0];

                    console.log(this.state.data[1]);
                },
                (err) => {
                    console.log(err);
                })
    }

    render() {
        console.log(this.state.data);
        return (
            <section className="stn-articles">
                <div className="row">
                    {content.map((item, index) => (
                        <div key={index} className="col-3 article">
                            <div key={index} className="ctn-img d-flex">
                            </div>
                            <div className="ctn-brand">
                                <p>{item.title}</p>
                            </div>
                            <div className="ctn-sndName">
                                <p>{item.sndName}</p>
                            </div>
                            <div className="ctn-pricee">
                                <p>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}

export default AllArticles;