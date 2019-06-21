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
            check: false
        };
        this.ip = 'http://127.0.0.1:8000';

    }
    componentDidMount() {
        /**
         * @param get all the categories
         */
        axios.get(this.ip + '/category')
            .then(
                (res) => {
                    console.log('========== Get category menu ===========')
                    console.log(res.data);
                    this.setState({ data: res.data });
                    this.setState({ check: true });
                },
                (err) => {
                    console.log(err);
                })
    }


    render() {
        console.log(this.state.data);
        if (this.state.check) {
            return (
                <div id="menu" className="wrapper">
                    <div className="wrapper">
                        <ul>
                            {this.state.data.map((elem, i) => (
                                <li key={i}>
                                    <a href={"/category/" + elem.id}>
                                        {elem.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default Menu;