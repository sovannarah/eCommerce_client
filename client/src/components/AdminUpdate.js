import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import Transport from './AdminPanel/TransportFee'
import PromotionCode from './AdminPanel/CodePromo';
import ArticleDetail, {addDetail} from './AdminPanel/ArticleDetail';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../style/css/adminupdate.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Category', field: 'category.id', lookup: {} },
                { title: 'Name', field: 'title' },
                { title: 'Price', field: 'price', type: 'numeric' },
                { title: 'Stock', field: 'stock', type: 'numeric' },
                {
                    title: 'Description',
                    field: 'description',
                },
                {title: 'Visiteur', field: 'nb_views', editable: 'never'},
                {title: 'Slider', field: 'showOnSlider', type: 'checkbox'},
            ],
            data: [],
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token'),
                'Access-Control-Allow-Credentials': true
            },
            category: [],
            category_id: '',
            category_name: '',
            parent_name: 'None',
            addArticle: [],
            commandPrice: 0,
        };
        this.ip = 'http://127.0.0.1:8000';

        this.changeDisplay = this.changeDisplay.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.passCommand = this.passCommand.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.parseCategory = this.parseCategory.bind(this)
        this.createExcel = this.createExcel.bind(this)
        this.outputEvent = this.outputEvent.bind(this);
    }

    async componentDidMount() {
        if (!localStorage.getItem('token'))
            window.location.replace('/account');
        else {
            await axios.get(this.ip + '/user/isAdmin',
                { headers: { token: localStorage.getItem('token') } }
            ).then(
                () => {
                    // window.location.replace('/');
                },
                () => {
                    // window.location.replace('/');
                })
        }
        axios.get(this.ip + '/article')
            .then(res => {
                this.setState({ data: res.data })
            })
            .catch(err => {
                console.log(err);
            })
        let data2 = await this.getCategory();
        this.parseCategory(data2);
        this.forceUpdate();

        let restock = false;
        let $str = "Restock info: maybe you sould reorder those products:\n";
        this.state.data.forEach((data) => {
            if (data.stock <= 10) {
                restock = true;
                $str += "- " + data.title + " (" + data.stock + ")\n";
            }
        });
        if (restock) {
            window.alert($str);
        }
    }

    passCommand(event) {
        console.log("========= Array Article ========");
        console.log(this.state.addArticle);
        axios.post(this.ip + "/stock/order",
            this.state.addArticle,
            { headers: { token: this.state.headers.token } }).then(
                (result) => {
                    console.log('======== Result ======');
                    console.log(result);
                    window.location.replace("/admin")
                },
                (error) => {
                    console.log("====== Error =======");
                    console.log(error)
                }
            )
    }

    parseCategory(data) {
        let c = -1;
        let copy;
        if (data)
        {
        while (data[++c]) {
            copy = this.state.columns;
            copy[0].lookup[data[c].id] = data[c].name;
            this.setState({columns: copy});
            this.state.category.push(data[c])
            if (data[c].sub && data[c].sub.length > 0)
                this.parseCategory(data[c].sub);
        }
        }
    }

    getCategory() {
        return axios.get(this.ip + '/category')
            .then(res => {
                return (res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChange(event) {
        this.setState({parent_name: event._targetInst.stateNode.innerText});
        this.setState({category_id: event._targetInst.stateNode.id})
    }

    async newCat() {
        const data = {
            parentId: this.state.category_id,
            name: this.state.category_name
        };
        await axios.post(this.ip + '/category', data, { headers: { 'token': this.state.headers['token'] } })
            .then(async (res) => {
                console.log("======== get category ===========");
                console.log(res.data);
                console.log("===============================");
                let data2 = await this.getCategory();
                this.parseCategory(data2);
                if (res.data) {
                    window.location.replace("/admin");
                }
            })
            .catch(err => {
                this.setState({ 'errorCat': err.response.data })
            })
    }


    changeDisplay(event, flag = false) {
        let tDisplay = ['command', 'article', 'transport', 'codePromo'];
        //,'commandStatus'

        let flagChange = false;
        let c = -1;
        if (flag === false) {
            document.getElementById("display" + event.target.id).hidden = false;
            while (tDisplay[++c]) {
                if (tDisplay[c] === event.target.id) {
                    document.getElementById(tDisplay[c]).classList.add("onglet");
                    flagChange = true;
                } else {
                    document.getElementById(tDisplay[c]).classList.remove("onglet")
                }
            }
        }
        if (flagChange === true || flag === true) {
            c = -1;
            while (tDisplay[++c]) {
                if (flag === true || event.target.id !== tDisplay[c])
                    document.getElementById("display" + tDisplay[c]).hidden = true;
            }
        }
    }

    addItem(id, itemPrice, name, nb) {
        let items = this.state.addArticle;
        let price = parseInt(document.getElementById(nb).value);
        let c = -1;
        let flagAdd = false;
        while (flagAdd === false && items[++c]) {
            if (items[c].id === id)
                flagAdd = true
        }
        if (flagAdd === true) {
            items[c].price = parseInt(itemPrice) * price;
            items[c].quantity = price;
        } else
            items.push({
                id: id,
                quantity: price,
                price: (parseInt(itemPrice) * price),
                name: name
            });
        this.setState({ addArticle: items });
        this.updatePrice();
    }

    updatePrice() {
        let data = this.state.addArticle;
        let c = -1;
        let total = 0;
        while (data[++c]) {
            total = total + data[c].price;
        }
        this.setState({ commandPrice: total });
    }

    addStock(i, price) {
        let quantity = parseInt(document.getElementById(i).value);
        document.getElementById('total' + i).innerText = (quantity * parseInt(price).toString())
    }

    exel = () => {
        axios.get(this.ip + "/excel")
            .then(res => {
                // console.log(res.data.file);
                window.location.href = this.ip+"/"+res.data.file;
            });

    }
    async createExcel() {
        await axios.get(this.ip + '/excel',
            {
                headers: {
                    'token': this.state.headers['token']
                }
            })
            .then(res => {
                window.location.href = this.ip + '/' + res.data.file;
            })
            .catch(err => {
                console.log(err);
            })
    }

    outputEvent(event) {
        this.setState({tmpArticle: ''});
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 130 }} id="onglets" onClick={this.changeOnglet}
                    className="d-flex justify-content-around col-6 ml-auto mr-auto mb-5 ">
                    <button id="article" className="onglet" onClick={this.changeDisplay}>Articles</button>
                    <button id="command" onClick={this.changeDisplay}>Make Command</button>
                    <button id="transport" onClick={this.changeDisplay}>Transport</button>
                    <button id="codePromo" onClick={this.changeDisplay}>Code Promo</button>
                    <button id="" className="btn btn-primary" onClick={this.exel}>Exel</button>
                </div>
                <div id="displaytransport" className="justify-content-center" style={{ marginTop: 120 }} hidden>
                    <Transport></Transport>
                </div>
                <div id="displaycodePromo" className="pl-5" style={{ marginTop: 120 }} hidden>
                    <PromotionCode></PromotionCode>
                </div>
                <div id="displaycommand" className="mt-5 mb-5 justify-content-center" hidden={true}>
                    <h2 className="border pt-3 pb-3">{"Total:  " + this.state.commandPrice}</h2>
                    <table className="mb-5 border">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>Price</th>
                                <th>stock</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((data, i) =>
                                <tr key={i}>
                                    <td>
                                        {data.title}
                                    </td>
                                    <td>
                                        {data.price}
                                    </td>
                                    <td>
                                        {data.stock}
                                    </td>
                                    <td>
                                        <input type="number" defaultValue="0" id={i}
                                            onChange={this.addStock.bind(this, i, data.price)} />
                                    </td>
                                    <td>
                                        <button variant="contained" color="primary"
                                            onClick={this.addItem.bind(this, data.id, data.price, data.name, i)}>
                                            Add
                                    </button>
                                    </td>
                                    <td>
                                        <p id={"total" + i}>0</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Button className="w-25 mr-3 ml-auto" variant="contained" color="primary"
                            onClick={this.passCommand}>
                        Pass Command
                    </Button>
                </div>
                {this.state.tmpArticle}
                <div id="displayarticle">
                    <MaterialTable
                        style={{ marginTop: 120 }}
                        title="Products"
                        columns={this.state.columns}
                        data={this.state.data}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Create Product',
                                isFreeAction: true,
                                onClick: () => {
                                    this.props.history.push('/admin/create')
                                }
                            },
                        ]}
                        onRowClick={
                            (event) => {
                                let index = event.target['parentElement']['rowIndex'] - 1;
                                let id = this.state.data[index];
                                addDetail(id);
                                this.setState({ tmpArticle: <div id="artR"><ArticleDetail clickHandler={this.outputEvent} article={id}></ArticleDetail></div> })
                            }
                        }
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = this.state.data;
                                        data[data.indexOf(oldData)] = newData;
                                        const formData = new FormData();
                                        Object.keys(this.state.data[data.indexOf(newData)]).forEach((v) => formData.append(v, this.state.data[data.indexOf(newData)][v]));
                                        this.setState({ data });
                                        formData.append('category', this.state.data[data.indexOf(newData)].category.id);
                                        axios.post(this.ip + '/article/' + data[data.indexOf(newData)].id, formData, { headers: this.state.headers })
                                            .then(res => {
                                            })
                                            .catch(console.log)
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = this.state.data;
                                        const remain = data.splice(data.indexOf(oldData), 1);
                                        axios.delete(this.ip + '/article/' + remain[0].id, { headers: this.state.headers })
                                            .then(res => {
                                            })
                                            .catch(console.log)
                                        this.setState({ data });
                                        // console.log(this.state.category);
                                    }, 600);
                                }),
                        }}
                    />
                    <section className="col-12 h-10 d-flex justify-content-between mt-5 mb-5">
                        <div className="d-flex">
                            <Select
                                value={this.state.category_id}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'Category',
                                    id: 'id'
                                }}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.category.map((data, i) =>
                                    <ul key={i}>
                                        <MenuItem id={data.id} value={data.id}>
                                            {data.name}
                                        </MenuItem>
                                    </ul>
                                )}
                            </Select>
                            <p>{this.state.parent_name}</p>
                            <TextField
                                id="standard-name"
                                label="Name"
                                value={this.state.category_name}
                                onChange={(event) => {
                                    this.setState({ category_name: event.target.value })
                                }}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" onClick={this.newCat.bind(this)}>
                                Create Category
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Admin;
