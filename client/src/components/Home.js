import React from 'react';
import Slider from './Slider';

import '../style/css/home.css';

class Home extends React.Component {
    render() {
        return(
            <section id="home-stn" className="bg-dark">
                <Slider />
                <section className="bg-info mt-4 container">
                    <div id="ctn-popular">
                        <h1 className="row d-flex justify-content-center">
                            THE MOST POPULAR
                        </h1>
                        <ul className="ul">

                        </ul> 
                    </div>
                </section>
            </section>
        )
    }
}

export default Home;