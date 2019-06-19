import React from 'react';
import { Link } from 'react-router-dom';
// import '../style/css/menu.css';
import axios from 'axios';

let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];

class AllMenu extends React.Component {
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
        axios.get('http://10.34.7.68:8000/category/' + url)
            .then(
                (res) => {
                    // console.log(this.state.data);
                    this.state.data = res.data[0];

                },
                (err) => {
                    console.log(err);
                })
    }


    render() {
        console.log(this.state.data);
        return (
            < div >
            <div className="mini-menu">
                <h1>Menu</h1>
                <ul>
                {Object.keys(this.state.data).map((elem) => (
                    <li>
                        {this.state.data[elem]}
                    </li>
                ))}
                </ul>

            </div>
            <div className="result-menu">
                <h1>Item</h1>
            </div>
            </div>
        );
    }
}

export default AllMenu;