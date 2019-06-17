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
    }

    addItem(e) {
        e.preventDefault();
        axios.post('http://10.34.7.0:8001/article', this.state)
            .then(res => {
                console.log(res.data)
            })
    }

    render() {
        return (
            <section className="col-12 h-10 d-flex">
                    <form id="form-add" method="post"
                          className="bg-light d-flex justify-content-around flex-column col-md-6 h-50 m-auto">
                        <TextField
                            id="outlined-name"
                            label="title"
                            name="title"
                            type="string"
                        />
                        <TextField
                            id="outlined-name"
                            label="description"
                            name="description"
                            type="string"
                        />
                        <TextField
                            id="outlined-name"
                            label="price"
                            name="price"
                            type="integer"
                        />
                        <TextField
                            id="outlined-name"
                            label="image"
                            name="image"
                            type="file"
                        />
                        <TextField
                            id="outlined-name"
                            label="stock"
                            name="stock"
                            type="integer"
                        />
                        <TextField
                            id="outlined-name"
                            label="category"
                            name="category"
                            type="string"
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