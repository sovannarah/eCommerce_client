import React from 'react';
import '../style/css/payment.css';

class Payment extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            month: [],
            year: []
        };
        this.checkout = this.checkout.bind(this);
        this.expiYear();
    }

    checkout() {

    }

    expiYear() {
        for (let y = 1; y <= 12; y++) {
            this.state.month.push(y)
        }

        for (let i = 2019; i <= 2039; i++) {
            this.state.year.push(i)
        }
    }

    render() {
        return (
            <section id="ctn-cartPage" className=" min-vh-100 flex-column container-fluid d-flex">
                <form method="post" onSubmit={this.checkout} id="ctn-cart"
                      className="rounded min-vh-50 col-lg-6 d-flex flex-column bg-grey m-auto">
                    <div className="w-50 h-75 d-flex flex-column justify-content-around m-auto">
                        <h1 className="text-secondary border-bottom">Payment</h1>
                        <label className="d-flex flex-column text-light">Card Number
                            <input id="outlined-name" className="mt-3" type="text" name=""/>
                        </label>
                        <label className="text-light">Expiration date
                            <div className="d-flex mt-3">
                                <select className="d-flex flex-column" name="">
                                    <option>MM</option>
                                    {this.state.month.map((month, i) => (
                                        month < 10 ?
                                            <option key={i} value={month}>0{month}</option>
                                            :
                                            <option key={i} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select name="">
                                    <option>YYYY</option>
                                    {this.state.year.map((year, i) => (
                                        <option key={i} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </label>
                        <label className="d-flex flex-column text-light">Card Name
                            <input id="outlined-name" className="mt-3" type="text" name=""/>
                        </label>
                        <button type="submit" className="btn-mainly ml-auto mr-auto">Pay</button>
                    </div>
                </form>
            </section>
        );
    }
}

export default Payment;