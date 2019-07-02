import React from 'react';

class Account extends React.Component {
    render() {
        return (
            <section>
                <label>Email : 
                    <input type="email" value={localStorage.getItem("email")}/>
                </label>
            </section>
        );
    }
}

export default Account;