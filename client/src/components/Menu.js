import React from 'react';
import Menui from '../images/icon/icon-menu-black.png';
import { Link } from 'react-router-dom';
import '../style/css/menu.css';
import axios from 'axios';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: {},
        }
       
    }
    async componentDidMount() {
        /**
         * @param get all the categories
         */
        axios.get('http://10.34.6.23:8000/category')
                .then(
                    (res) => {
                        this.setState({ data: res.data[0] });
                    },
                    (err) => {
                        console.log(err);
                    })
        }



    render() {
        console.log(this.state.data);
        return (
            <div id="menu" className="wrapper">
                <div className="wrapper">
                    <ul>
                        {Object.keys(this.state.data).map((elem, i) => (
                            <li key={i}>
                                <Link to={"/category/" + this.state.data[elem].id}>
                                    {this.state.data[elem].name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;