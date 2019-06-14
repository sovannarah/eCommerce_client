import React from 'react';

// import '../style/css/adminAdd.css';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

class Menu extends React.Component {

    handleClick(e) {
        console.log(e)
    }

    
    
    render() {
        return (
            <section className="adminAdd d-flex">
                <div className="ctn-addPix col-6">
                    <form action="path/to/next.php" method="post" enctype="multipart/form-data">   
                        {/* <div className="presti" onClick={this.handleClick(e)}></div> */}
                        <div class="upload">
                            <input type="file" name="film" id="file" class="browse" multiple />
                            {/* <span id="file-select-button" ref={this.handleClick}  class="browse button black"></span> */}
                        </div>
                    </form>
                </div>
                <div className="form-articles d-flex flex-column col-6">
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
                </div>
            </section>
        );
    }
}

export default Menu;