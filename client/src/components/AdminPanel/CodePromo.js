import React from 'react';
import axios from 'axios';


class CodePromo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getCodes: [],
            getCodeHtml: '',
            addCodes: [{
                code: '',
                reduction: 0
            }],
            header: {token: localStorage.getItem('token')},
        };

        this.ip = 'http://127.0.0.1:8000';

        this.sendCode = this.sendCode.bind(this);
        this.addCode = this.addCode.bind(this);
        this.rmCode = this.rmCode.bind(this);
        this.tamereConstruct = this.tamereConstruct.bind(this);
        this.changeCodePromo = this.changeCodePromo.bind(this);
        this.getCode = this.getCode.bind(this);
        this.removeCode = this.removeCode.bind(this);
        this.randomString = this.randomString.bind(this);
    }

    componentDidMount() {
        this.getCode();
    }

    getCode() {
        axios.get(this.ip + '/promotionCode',
            {headers: this.state.header}).then(
            (res) => {
                this.setState({getCode: res.data});
                this.displayCode();
            });
    }

    removeCode(event) {
        let key = event.target.id.split('-')[1];
        let id = this.state.getCode[parseInt(key)].id;
        axios.delete(this.ip + '/promotionCode/' + id,
            {headers: this.state.header}).then((res) => {
                console.log(res);
                this.getCode();
            },
            (err) => {
                console.log(err);
            }
        )
    }

    displayCode() {
        let htmlCode =
            <div>
                {this.state.getCode.map((data, i) =>
                    <ul key={"getCode" + i}>
                        <button id={"deleteCode-" + i} onClick={this.removeCode}>Delete</button>
                        <p>code: {data.code}</p>
                        <p>Reduction: {data.reduction}</p>
                    </ul>
                )}
            </div>;
        this.setState({getCodeHtml: htmlCode});
    }

    addCode() {
        let newCode = {
            code: '',
            reduction: 0
        };
        let codes = this.state.addCodes;
        codes.push(newCode);
        this.setState({addCodes: codes});
    }

    rmCode(event) {
        let key = parseInt(event.target.id.split('-')[1]);
        let codes = this.state.addCodes;
        if (codes.length > 1) {
            codes.splice(key, 1);
        }
        this.setState({addCodes: codes});
    }

    tamereConstruct() {
        return (new Promise((resolve) => {
            let c = -1;
            let leng = this.state.addCodes.length;
            let code = this.state.addCodes;
            while (++c < leng) {
                code[c].code = document.getElementById('code-' + c).value;
                code[c].reduction = document.getElementById('reduction-' + c).value;
            }
            resolve(code);
        }))
    }

    sendCode() {
        axios.post(this.ip + '/promotionCode', this.state.addCodes,
            {headers: this.state.header}).then(
            (res) => {
                console.log(res);
                this.getCode();
            }
        )
    }

    changeCodePromo(event) {
        let code = this.state.addCodes;
        let table = event.target.id.split('-');
        code[parseInt(table[1])][table[0]] = event.target.value;
        this.setState({addCodes: code});
        console.log(this.state.addCodes);
    }

    randomString(event) {
        let c = -1;
        let codes = this.state.addCodes;
        let key = parseInt(event.target.id.split('-')[1]);
        let str = '';
        while (++c < 9) {
            let rand = Math.floor(Math.random() * Math.floor(90) + 48);
            if ((rand > 47 && rand < 58) || (rand > 64 && rand < 91))
                str = str + String.fromCharCode(rand);
            else
                c = c - 1;
        }
        codes[key].code = str;
        this.setState({addCodes: codes});
    }

    render() {
        return (
            <div className="mt-5 mb-5">
                <div>
                    <div className="mb-5">
                        <button className="btn-mainly mr-4" onClick={this.sendCode}>Create</button>
                        <button className="btn-mainly" onClick={this.addCode}>Add Codes</button>
                    </div>
                    {this.state.addCodes.map((data, i) =>
                        <ul className="mt-3 mb-5" key={'Code' + i}>
                            <label htmlFor={"code"}> Code Promo:
                                <input type="text" id={'code-' + i} value={data.code} onChange={this.changeCodePromo}/>
                            </label>
                            <label htmlFor={'reduction-' + i}> Promotion:
                                <input type="number" value={data.reduction} max={100} id={'reduction-' + i}
                                       onChange={this.changeCodePromo}/>
                            </label>
                            <div className="mt-3 d-flex flex-column">
                                <button id={"randomPromotion-" + i} className="btn btn-info"
                                        onClick={this.randomString}>Random
                                </button>
                                <button id={"promotionCode-" + i} className="btn btn-danger"
                                        onClick={this.rmCode}>Remove
                                </button>
                            </div>
                        </ul>
                    )}
                </div>
                <div>
                    {this.state.getCodeHtml}
                </div>
            </div>
        );
    }
}

export default CodePromo;