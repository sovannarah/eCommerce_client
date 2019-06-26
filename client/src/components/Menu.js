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
                    // console.log('========== Get category menu ===========')
                    // console.log(res.data);
                    this.setState({ data: res.data });
                    this.setState({ check: true });
                },
                (err) => {
                    // console.log(err);
                })
    }


    render() {
        // console.log(this.state.data);
        if (this.state.check) {
            return (
                <div id="menu" className="wrapper">
                    <div className="wrapper">
                        <ul className="w-100">
                            {this.state.data.map((elem, i) => (
                                <li className="list-menu d-flex justify-content-center" key={i}>
                                    <a className="m-auto" href={"/category/" + elem.id}>
                                        {elem.name[0].toUpperCase() + elem.name.substr(1)}
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