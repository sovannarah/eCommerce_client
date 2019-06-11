import React from 'react';


import '../style/css/header.css';
import '../style/css/description.css';

class Description extends React.Component {
    constructor(props){
        super(props);
        this.data = {
            title: "Boss",
            model: "The sent",
            price: 12,
            desc: 'wtf'
        };
    }
    render() {
        const {title, model, price, desc} = this.data;
        return (

                <div className="desc">
                    <h2>{title}</h2>
                    <span>{model}</span>
                    <div>{price}</div>
                    <p>{desc}</p>
                </div>

        );
    }
}

export default Description;