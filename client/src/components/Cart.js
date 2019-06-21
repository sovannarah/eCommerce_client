import React from 'react';
import axios from 'axios';
import '../style/css/cart.css';



const ip = 'http://10.34.6.23:8000';



class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            add: ''
        }
        var id = this.props.match.params.id;
        axios.get(ip + '/article/' + id)
            .then(res => {
                this.setState({ article: res.data })
            })
    }

    render() {
        return (
            <div>
                {this.state.data.map((elem, i) => (
                    <li key={i}>    
                        {elem.title}
                    </li>
                ))}
            </div>
        );
    }
}

export default Cart;