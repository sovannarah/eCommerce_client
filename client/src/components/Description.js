import React from 'react';


import '../style/css/header.css';
import '../style/css/description.css';

const DEFAULT_PRODUIT = {
    brand: 'BOSS',
    sndName: 'Mike',
    description: 'The best of the best that exists in the world <3 I LOVE AMALIA',
    prix: '15,23',
    image: ''
};

class Description extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            produit: null,
            isOpen: false
        }
    }

    open = item => {

        //TODO: API call to get item data
        this.setState({
            produit: item,
            isOpen: true
        })
    }

    close = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const {brand, sndName, prix, description} = (this.state.produit || DEFAULT_PRODUIT);
        return (

                <div className={"desc " + (this.state.isOpen ? "open" : "closed")}>
                    <h2>{brand}</h2>
                    <span>{sndName}</span>
                    <div>{prix}</div>
                    <p>{description}</p>
                </div>

        );
    }
}

export default Description;