import React from 'react';

const DEFAULT_PRODUIT = {
    brand: 'BOSS',
    sndName: 'Mike the Best <3 ',
    description: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."\n' +
        '\n',
    price: '15,23',
    image: '',
    stock: 10,
};

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: null,
        };
    }


    render() {
        const {brand, sndName, price, description, stock} = (this.state.produit || DEFAULT_PRODUIT);
        return (

            <div>
                <div>
                    <h3>{brand}</h3>
                    <h3>&#8212; {sndName} &#8212;</h3>
                    <div>&euro; {price}</div>
                    <div>
                        <div> stock: {stock}</div>
\                    </div>
                    <div>
                        <div>DESCRIPTION</div>
                        {description}</div>
                </div>
            </div>

        );
    }
}

export default Description;