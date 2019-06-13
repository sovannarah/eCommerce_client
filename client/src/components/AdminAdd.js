import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Menu extends React.Component {

    handleClick() {
        const wrapper = document.getElementById('Menu');
        wrapper.classList.toggle('close');
    }

    render() {
        return (
            <section className="adminAdd d-flex flex-column">
                <TextField
                    id="outlined-name"
                    className="ml-5 mr-5"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    className="ml-5 mr-5"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    className="ml-5 mr-5"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                />
                <h5 className="ml-5">DESCRIPTION</h5>
                <TextField
                    id="outlined-multiline-static"
                    className="ml-5 mr-5"
                    multiline
                    rows="7"
                    defaultValue="Default Value"
                    margin="normal"
                    variant="outlined"
                />
                <Fab variant="extended" aria-label="Delete" className="ml-5 mr-5">
                    Save
                </Fab>
            </section>
        );
    }
}

export default Menu;