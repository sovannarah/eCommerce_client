import React from 'react';


class Checkin extends React.Component {
    
    render () {
        if(localStorage.getItem("token")){
            window.location.replace("/payment")
        } else {
            return (
                <section>
                    
                </section>
            );
        }
    }

}

export default Checkin;