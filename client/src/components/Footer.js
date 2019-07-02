import React from 'react';
import {Link} from 'react-router-dom';
import '../style/css/foort.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="container-fluid d-flex justify-content-center">
                <div className="text-light d-flex flex-column justify-content-center">
                    <h4 className="ml-auto mr-auto">Sign up to receive special offers and update</h4>
                    <form id="form-footer" method="post" className="d-flex mt-5 mb-5 d-flex justify-content-center">
                        <input type="text" className="col-7" placeholder="Enter your email adress"/>
                        <button className="col-4 ml-2 bg-mainly" type="submit">Sign up !</button>
                    </form>
                    <div id="weshalors" className="d-flex justify-content-between">
                        <Link to="/">About</Link>
                        <Link to="/">Blog</Link>
                        <Link to="/">Delivery</Link>
                        <Link to="/">Return</Link>
                        <Link to="/">Contact</Link>
                        <Link to="/">Help</Link>
                    </div>
                    <p className=" mt-4 ml-auto mr-auto text-secondary">
                        &copy;LeGitans / All rights reserved / Tips for use / Privacy / Author credit / Conditions
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;