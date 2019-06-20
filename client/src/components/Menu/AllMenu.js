import React from 'react';
import { Link } from 'react-router-dom';
// import '../style/css/menu.css';
import axios from 'axios';

/**
 * @param split url to get the last value
 */
let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];

class AllMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: {},
            check: false
        }
    }
    async componentDidMount() {
        /**
         * @param show category user click on
         */
        axios.get(`http://10.34.6.23:8000/category/${url}/article`)
            .then(
                (res) => {
                    console.log(this.state.data);

                    this.setState({ data: res.data })
                    this.setState({ check: true })

                },
                (err) => {
                    console.log(err);
                })
    }


    render() {
        console.log(this.state.data);
        if (this.state.check) {
            return (
                < div >
                    <div className="mini-menu">
                        <h1>Menu</h1>
                        <ul>
                            {this.state.data.map((elem) => (
                                <li>
                                    <Link to={`/article/${elem.id}`}>
                                        {elem.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="result-menu">
                        <h1>Item</h1>
                        {this.state.data.map((elem) => (
                            <li>
                                {elem.description}
                            </li>
                        ))}
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default AllMenu;