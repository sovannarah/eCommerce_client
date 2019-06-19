import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            images: '',
            nb_views: '',
            stock: '',
            category: '',

        };
        this.change = this.change.bind(this);
        this.addItem = this.addItem.bind(this);
    }


    change(e) {
        if (e.target.name === "title") {
            this.state.title = e.target.value;

        } else if (e.target.name === "description") {
            this.state.description = e.target.value;

        } else if (e.target.name === "price") {
            this.state.price = e.target.value;

        } else if (e.target.name === "images") {
            this.state.images = e.target.value;

        } else if (e.target.name === "stock") {
            this.state.stock = e.target.value;

        } else if (e.target.name === "category") {
            this.state.category = e.target.value;

        }
    }

    addItem(e) {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'token': localStorage.getItem('token'),
            'Access-Control-Allow-Credentials': true
        };
         const ip='http://10.34.7.68:8000';
        e.preventDefault();
        console.log(this.state.title);
        const formData = new FormData();
        Object.keys(this.state).forEach((v) => formData.append(v, this.state[v]));
        axios.post(ip+'/article', formData,{headers:headers})
            .then(res => {
                console.log(res.data)
            })
    }

    render() {
        return (
            <section className="col-12 h-10 d-flex">

                <form id="form-add" method="post"
                      className="bg-light d-flex justify-content-around flex-column col-md-6 h-50 m-auto">
                    <p></p>
                    <p></p>
                    <TextField
                        id="outlined-name"
                        label="title"
                        name="title"
                        type="string"
                        onChange={this.change}
                    />
                    <TextField
                        id="outlined-name"
                        label="description"
                        name="description"
                        type="string"
                        onChange={this.change}

                    />
                    <TextField
                        id="outlined-name"
                        label="price"
                        name="price"
                        type="integer"
                        onChange={this.change}

                    />
                    <TextField
                        id="outlined-name"
                        label="image"
                        name="image"
                        type="file"
                        onChange={this.change}

                    />
                    <TextField
                        id="outlined-name"
                        label="stock"
                        name="stock"
                        type="integer"
                        onChange={this.change}

                    />
                    <TextField
                        id="outlined-name"
                        label="category"
                        name="category"
                        type="string"
                        onChange={this.change}

                    />
                    <Fab id="button-add" onClick={this.addItem} type="submit" className="w-50 ml-auto mr-auto"
                         variant="extended" color="secondary">
                        Add Item
                    </Fab>
                </form>
            </section>
        );
    }
}

export default Admin;