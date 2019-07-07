import React from 'react';
import '../style/css/menu.css';
import axios from 'axios';

let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];
const urlPos = FullUrl.split("/")[1];

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: [],
            check: false,
            category: [],
            curr_category: []
        };
        // this.ip = 'http://10.34.7.68:8001';
        // this.ip = 'http://127.0.0.1:8000';
        //this.ip = 'http://10.34.7.0:8000';
        this.ip = 'http://10.41.176.52:8001';

        this.parseCategory = this.parseCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }


    async componentDidMount() {
        if(urlPos === "category") {
            let data2 = await this.getCategory();
            this.setState({curr_category: [data2]})
            this.parseCategory(this.state.curr_category);
            this.forceUpdate()
        }

        /**
         * @param get all the categories
         */
        axios.get(this.ip + '/category')
            .then(
                (res) => {
                    let cat = this.state.category;
                    if (urlPos === "category") {
                        for (let i = 0; i < cat.length; i++) {
                            this.state.data.push(cat[i])
                        }

                    } else {
                        this.setState({data: res.data});
                    }
                    this.setState({check: true});
                },
                (err) => {
                    // console.log(err);
                })


    }

    parseCategory(data) {
        let c = -1;
        while (data[++c]) {
            this.state.category.push(data[c])
            if (data[c].children && data[c].children.length > 0) {
                this.parseCategory(data[c].children);
            }
        }

    }

    getCategory() {

        return axios.get(this.ip + '/category/' + url)
            .then(res => {
                // console.log(res.data)
                return (res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.check) {
            return (
                <div id="menu" className="wrapper">
                    <div className="wrapper">
                        <ul className="w-100">
                            <a className="m-auto" href={"/"}>
                                <li className="list-menu d-flex justify-content-center">
                                    <p className="m-auto">Menu</p>
                                </li>
                            </a>
                            <a className="m-auto" href={"/articles"}>
                                <li className="list-menu d-flex justify-content-center">
                                    <p className="m-auto">All articles</p>
                                </li>
                            </a>
                            {this.state.data.map((elem, i) => (
                                <a key={i} className="m-auto" href={"/category/" + elem.id}>
                                    <li className="list-menu d-flex justify-content-center" key={i}>
                                        <p className="m-auto">{elem.name[0].toUpperCase() + elem.name.substr(1)}</p>
                                    </li>
                                </a>
                            ))}
                            <a className="m-auto" href={"/category/6"}>
                                <li className="list-menu d-flex justify-content-center">
                                    <p className="m-auto">Used Products & Reconditioned</p>
                                </li>
                            </a>
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