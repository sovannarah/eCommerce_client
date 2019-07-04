import React from 'react';
import axios from 'axios';
import Fab from "@material-ui/core/Fab";
import '../style/css/admin.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: []
        };
        // this.ip = 'http://10.34.7.68:8001';
        this.ip = 'http://127.0.0.1:8000';
        this.parseCategory = this.parseCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    async componentDidMount() {
        if (!localStorage.getItem('token'))
            window.location.replace('/account');
        else {
            await axios.get(this.ip + '/user/isAdmin', {headers: {token: localStorage.getItem('token')}}
                ).then(
                () => {
                    // console.log("===== Welcome ========");
                },
                () => {
                    // window.location.replace('/');
                })
        }

        let data2 = await this.getCategory();
        this.parseCategory(data2);
        this.forceUpdate()
    }

    parseCategory(data) {
        let c = -1;
        console.log(data)
        if (data)
        {
        while (data[++c]) {
            this.state.category.push(data[c])
            if (data[c].sub && data[c].sub.length > 0)
                this.parseCategory(data[c].sub);
        }
    }
    }

    getCategory() {
        return axios.get(this.ip + '/category')
            .then(res => {
                return (res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }


    addItem(e) {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'token': localStorage.getItem('token'),
            'Access-Control-Allow-Credentials': true
        };
        const formData = new FormData(e.target);
        axios.post(this.ip + '/article', formData, {headers: headers})
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    window.location.replace('/admin');
                }
            });
    }

    render() {
        return (
            <section id="stn-adminCreate" className="col-12 h-100 d-flex">
                <form id="form-add" method="post" onSubmit={this.addItem}
                      className="d-flex col-md-12 h-50 m-auto">
                    <div className="d-flex flex-column mh-100 col-12">
                        <div className="d-flex h-75 m-5">
                            <div className="col-6 d-flex flex-column ">
                                <label className="d-flex flex-column">Title
                                    <input
                                        className="outlined-name"
                                        name="title"
                                        type="string"
                                    />
                                </label>
                                <label className="d-flex flex-column">Description
                                    <input
                                        className="outlined-name"
                                        name="description"
                                        type="string"

                                    />
                                </label>
                                <label className="d-flex flex-column">Price
                                    <input
                                        className="outlined-name"
                                        name="price"
                                        type="number"

                                    />
                                </label>
                            </div>
                            <div
                                className="col-6 d-flex justify-content-around flex-column">
                                <label className="d-flex flex-column">Images
                                    <input
                                        name="images[]"
                                        type="file"
                                        accept='image/*'
                                        multiple
                                    />
                                </label>
                                <label className="d-flex flex-column">Stock
                                    <input
                                        className="outlined-name"
                                        name="stock"
                                        type="number"
                                    />
                                </label>
                                <label className="d-flex flex-column">Category
                                    <select name="category" className="outlined-name">
                                        {this.state.category.map((item, index) =>
                                            <option key={index} id={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        )}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <Fab id="button-add"
                             type="submit" className="w-25 ml-auto "
                             variant="extended" color="secondary">
                            Add Item
                        </Fab>
                    </div>
                </form>
            </section>
        );
    }
}

export default Admin;