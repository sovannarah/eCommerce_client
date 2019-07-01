import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

/**
 * @param split url to get the last value
 */
let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: [],
            check: false,
            category: [],
            curr_category: []
        };
        this.ip = 'http://127.0.0.1:8000';
        this.parseCategory = this.parseCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }

    async componentDidMount() {
        let data2 = await this.getCategory();
        this.setState({curr_category: [data2]})
        this.parseCategory(this.state.curr_category);
        this.forceUpdate()


        let cat = this.state.category;
        /**
         * @param show category user click on
         */
        for (let i = 0; i < cat.length; i++) {
            axios.get(this.ip + '/category/' + cat[i].id + '/article')
                .then(
                    (res) => {

                        for (let y = 0; y < res.data.length; y++) {
                            this.state.data.push(res.data[y])
                        }
                        this.setState({check: true})

                    },
                    (err) => {
                        console.log(err);
                    })
        }
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
                return (res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        if (this.state.check) {
            return (

                <section id="ctn-articles" className="container-fluid justify-content-center d-flex">
                    <ul className="container-fluid col-lg-8">
                        {this.state.data.map((item, index) => (
                            <div key={index} className=" ctn-art bg-light mt-4 mb-4 w-100">
                                <Link className="d-flex h-100" to={`/article/${item.id}`}>
                                    <div className="ctn-image h-100 mt-auto mb-auto col-3 d-flex">
                                        <img id="popular-img" className="m-auto"
                                             src={this.ip + "/uploads/images/" + item.images[0]}/>
                                    </div>
                                    <div className="p-3">
                                        <h5>{item.title}</h5>
                                        <p>${item.price}</p>
                                        <p>{item.description}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </ul>
                </section>
            );
        } else {
            return <div></div>
        }
    }
}

export default Category;
