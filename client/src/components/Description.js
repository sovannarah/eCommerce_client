import React from 'react';


import '../style/css/header.css';
import '../style/css/description.css';

const DEFAULT_PRODUIT = {
    brand: 'BOSS',
    sndName: 'Mike the Best <3 ',
    description: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."\n' +
        '\n',
    prix: '15,23',
    image: ''
};

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: null,
            isOpen: true
        }
    }

    open = item => {

        //TODO: API call to get item data
        this.setState({
            produit: item,
            isOpen: true
        })
    };

    closed = () => {
        this.setState({
            isOpen: false
        });
    };

    render() {
        const {brand, sndName, prix, description} = (this.state.produit || DEFAULT_PRODUIT);
        return (

            <div className={"desc " + (this.state.isOpen ? "open" : "closed")}>
                <h1 className={"title"}>{brand}</h1>
                <h3 className={"model"}>{sndName}</h3>
                <div className={"price_font"}>&euro; {prix}</div>
                <div className={"cart_button"}>
                    <button className="btn-default justify-content-center">ADD TO CART</button>
                </div>
                <p className={"descript"}><p className={"bold"}>DESCRIPTION</p>
                    {description}</p>
            </div>

        );
    }
}

export default Description;