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
            isOpen: false
        }
        this.containerDiv = React.createRef();
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = e => {
        if (this.containerDiv.current.contains(e.target))
            return;
        this.close();
    }

    open = item => {

        //TODO: API call to get item data
        this.setState({
            produit: item,
            isOpen: true
        })
    };

    close = () => {
        this.setState({
            isOpen: true
        });
    };

    render() {
        const {brand, sndName, prix, description} = (this.state.produit || DEFAULT_PRODUIT);
        return (

            <div ref={this.containerDiv} className={"desc " + (this.state.isOpen ? "desc-open" : "desc-closed")}>
                <div style={{width: '43vw'}}>
                    <h1 className={"title"}>{brand}</h1>
                    <h3 className={"model"}>&#8212; {sndName} &#8212;</h3>
                    <div className={"price_font"}>&euro; {prix}</div>
                    <div className={"cart_button"}>
                        <button className="btn-default justify-content-center">ADD TO CART</button>
                    </div>
                    <p className={"descript"}><p className={"bold"}>DESCRIPTION</p>
                        {description}</p>
                </div>
            </div>

        );
    }
}

export default Description;