import React from 'react';
import axios from 'axios';
import {Promise} from "q";
import {instanceOf} from "prop-types";

class transportFee extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                header: {token: localStorage.getItem('token')},
                //ip: 'http://127.0.0.1:8000',
                //ip: 'http://10.34.7.0:8000',
                ip: 'http://10.41.176.52:8000',
                offer: [],
                offeritems: [],
                upOffer: ''
            };
        this.transportdata = null;
        this.getTransport = this.getTransport.bind(this);
        this.addTransport = this.addTransport.bind(this);
        this.updTransport = this.updTransport.bind(this);
        this.updOffer = this.updOffer.bind(this);
        this.requestTransport = this.requestTransport.bind(this);
        this.delTransport = this.delTransport.bind(this);
        this.deleteOffer = this.deleteOffer.bind(this);
        this.delteSpec = this.delteSpec.bind(this);
        this.moreOffer = this.moreOffer.bind(this);
        this.addSpec = this.addSpec.bind(this);
        this.addOffer = this.addOffer.bind(this);
        this.delOffer = this.delOffer.bind(this);
        this.delSpec = this.delSpec.bind(this);
    }

    async componentDidMount() {
        await this.requestTransport();
        this.moreOffer();
        this.updOffer();
    }

    requestTransport() {
        return (new Promise((resolve) => {
            axios.get(this.state.ip + '/transport',
                {headers: this.state.header}).then(
                (res) => {
                    console.log("===== rres =====");
                    this.setState({offeritems: res.data});
                    resolve("ok");
                }
            );
        }));
    }

    changeDisplay(event) {
        let tDisplay = ['create', 'update'];
        let c = -1;
        while (tDisplay[++c]) {
            if (tDisplay[c] + "Transport" !== event.target.id) {
                document.getElementById(tDisplay[c]).hidden = true;
            } else {
                document.getElementById(tDisplay[c]).hidden = false;
            }
        }
    }

    async addTransport() {
        let transport = await this.getTransport();
        let flag = false;
        await axios.post(this.state.ip + '/transport',
            transport,
            {headers: this.state.header}).then(
            () => {
                flag = true;
            }
        );
        if (flag === true)
            this.forceUpdate();
    }
	async addTransport()
	{
		let transport = await this.getTransport();
		let flag = false;
		console.log(transport);
		await axios.post(this.state.ip + '/transport',
			transport ,
			{ headers: this.state.header }).then(
			() =>
			{
				flag = true;
			}
		);
		if (flag === true)
			this.forceUpdate();
	}

    getTransport() {
        return (new Promise((resolve => {
            let c1 = -1;
            let transport = {
                name: document.getElementById('transportName').value,
                offer: []
            };
            let offer;
            while ((offer = document.getElementById('offerName' + (++c1)))) {
                let offerItem = {name: offer.value, spec: []};
                let c2 = -1;
                let spect;
                while ((spect = document.getElementById('spec-' + c1 + '-' + (++c2)))) {
                    let pos = '-' + c1 + '-' + c2;
                    let specItem = {
                        name: document.getElementById('specName' + pos).value,
                        unity: document.getElementById('unity' + pos).value,
                        minValue: document.getElementById('minValue' + pos).value,
                        price: document.getElementById('price' + pos).value
                    };
                    offerItem.spec.push(specItem);
                }
                transport.offer.push(offerItem);
            }
            resolve(transport);
        })));
    }
	getTransport()
	{
		return (new Promise((resolve =>
		{
			let c1 = -1;
			let transport = {
				name: document.getElementById('transportName').value,
				offer: []
			};
			let offer;
			while ((offer = document.getElementById('offerName' + (++c1))))
			{
				let offerItem = {name: offer.value, spec: []};
				let c2 = -1;
				let spect;
				while ((spect = document.getElementById('spec-' + c1 + '-' + (++c2))))
				{
					let pos = '-' + c1 + '-' + c2;
					let specItem = {
						name: document.getElementById('specName' + pos).value,
						unity: document.getElementById('unity' + pos).value,
						minValue: document.getElementById('minValue' + pos).value,
						minPrice: document.getElementById('minPrice' + pos).value,
						price: document.getElementById('price' + pos).value
					};
					offerItem.spec.push(specItem);
				}
				transport.offer.push(offerItem);
			}
			resolve(transport);
		})));
	}

    delOffer(event) {
        let key = event.target.id.split('-')[0];
        let offers = this.state.offer;
        offers.splice(key, 1);
        this.setState({offer: offers});
    }

    delSpec(event) {
        let keys = event.target.id.split('-');
        let offers = this.state.offer;
        console.log(offers[parseInt(keys[1])]);
        offers[parseInt(keys[1])].spec.splice(parseInt(keys[2]), 1);
        this.setState({offer: offers});
    }

    async moreOffer() {
        let offert = this.state.offer;
        let len = offert.length;
        let specHtml =
            <div id={"spec-" + len + "-0"} style={{border: 2 + "px green solid"}}>
                <button id={"specDel-" + len + "-0"} onClick={this.delSpec}>Remove</button>
                <p>Ex: distance, Km, 0.5/Km at 250 Km </p>
                <label htmlFor={"specName-" + len + "-0"}>
                    Name:
                </label>
                <input type="text" id={"specName-" + len + "-0"}/>
                <label htmlFor={"unity-" + len + "-0"}>Unity: </label>
                <input type="text" id={"unity-" + len + "-0"}/>
                <label htmlFor={"minValue-" + len + "-0"}>Min Value: </label>
                <input type="number" id={"minValue-" + len + '-0'}/>
                <label htmlFor={"price-" + len + "-0"}>Price per unity: </label>
                <input type="number" id={'price-' + len + '-0'}/>
            </div>;
        let offerHtml =
            <div id={"offer" + len} style={{border: 2 + "px red solid"}}>
                <button id={"offerDel-" + len} onClick={this.delOffer}>Remove</button>
                <label htmlFor={"offerName" + len}>
                    Oferr Name:
                </label>
                <input type="text" id={"offerName" + len}/>
                <button onClick={this.moreSpec.bind(this, len)}>
                    Add Spec
                </button>
            </div>;
        offert.push({offer: offerHtml, spec: [specHtml]});
        this.setState({offer: offert});
    }

    moreSpec(len) {
        let offert = this.state.offer;
        let specHtml =
            <div id={"spec-" + len + "-" + offert[len].length}
                 style={{border: 2 + "px green solid"}}>
                <button id={"offerDel-" + len} onClick={this.delSpec}>Remove</button>
                <p>Ex: distance, Km, 0.5/Km at 250 Km </p>
                <label htmlFor={"specName-" + len + "-" + offert[len].length}>
                    Name:
                </label>
                <input type="text" id={"specName-" + len + "-" +
                offert[len].length}/>
                <label htmlFor={"unity-" + len + "-" +
                offert[len].length}>Unity: </label>
                <input type="text" id={"unity-" + len + "-" +
                offert[len].length}/>
                <label htmlFor={"minValue-" + len + "-" +
                offert[len].length}>Min Value: </label>
                <input type="number" id={"minValue-" + len + "-" +
                offert[len].length}/>
                <label htmlFor={"price-" + len + "-" +
                offert[len].length}>Price per unity: </label>
                <input type="number" id={"price-" + len + "-" +
                offert[len].length}/>
            </div>;
        offert[len].spec.push(specHtml);
        this.setState({offer: offert})
    }
	moreSpec(len)
	{
		let offert = this.state.offer;
		let specHtml =
			<div id={"spec-" + len + "-" + offert[len].spec.length}
			     style={{ border: 2 + "px green solid"}}>
				<button id={ "offerDel-" + len } onClick={this.delSpec}>Remove</button>
				<p>Ex: distance, Km, 0.5/Km at 250 Km </p>
				<label htmlFor={"specName-" + len + "-" + offert[len].spec.length}>
					Name:
				</label>
				<input type="text" id={"specName-" + len + "-" +
				offert[len].spec.length}/>
				<label htmlFor={"unity-" + len + "-" +
				offert[len].spec.length}>Unity: </label>
				<input type="text" id={"unity-" + len + "-" +
				offert[len].spec.length}/>
				<label htmlFor={"minValue-" + len + "-" +
				offert[len].spec.length}>Min Value: </label>
				<input type="number" id={"minValue-" + len + "-" +
				offert[len].spec.length}/>
				<label htmlFor={"minPrice-" + len + "-" +
				offert[len].spec.length}>Min Price: </label>
				<input type="text" id={"minPrice-" + len + "-" +
				offert[len].spec.length}/>
				<label htmlFor={"price-" + len + "-" +
				offert[len].spec.length}>Price per unity: </label>
				<input type="number" id={"price-" + len + "-" +
				offert[len].spec.length}/>
			</div>;
		offert[len].spec.push(specHtml);
		this.setState({offer: offert})
	}

    addOffer(event) {
        let tkey = event.target.id.split('-')[1];
        let offer = {
            name: '',
            specs: [{
                name: '',
                unity: '',
                minValue: 0,
                price: 0
            }]
        };
        let transport = this.state.offeritems;
        transport[tkey].offers.push(offer);
        this.setState({offeritems: transport});
        console.log(this.state.offeritems);
        this.updOffer();
    }

    addSpec(event) {
        let keys = event.target.id.split('-');
        let tkey = keys[1];
        let transport = this.state.offeritems;
        let okey = keys[2];
        let spec = {
            name: '',
            unity: '',
            minValue: 0,
            price: 0
        };
        transport[tkey].offers[okey].specs.push(spec);
        this.setState({offeritems: transport});
        console.log(this.state.offeritems);
        this.updOffer()
    }
	addOffer(event)
	{
		let tkey = event.target.id.split('-')[1];
		let offer = {
			name: '',
			specs: [{
				name: '',
				unity: '',
				minValue: 0,
				minPrice: 0,
				price: 0
			}]
		};
		let transport = this.state.offeritems;
		transport[tkey].offers.push(offer);
		this.setState({ offeritems: transport});
		console.log(this.state.offeritems);
		this.updOffer();
	}
	addSpec(event)
	{
		let keys = event.target.id.split('-');
		let tkey = keys[1];
		let transport = this.state.offeritems;
		let okey = keys[2];
		let spec = {
			name: '',
			unity: '',
			minValue: 0,
			minPrice: 0,
			price: 0
		};
		transport[tkey].offers[okey].specs.push(spec);
		this.setState({ offeritems: transport });
		console.log(this.state.offeritems);
		this.updOffer()
	}

    async delTransport(event) {
        let key = parseInt(event.target.id.split('-')[1]);
        let id = this.state.offeritems[key].id;
        await axios.delete(this.state.ip + '/transport/' + id,
            {headers: this.state.header}).then(
            async () => {
                await this.requestTransport();
                this.moreOffer();
                this.updOffer();
            }
        );
    }

    async delteSpec(event) {
        let keys = event.target.id.split('-');
        let tkey = keys[1];
        let okey = keys[2];
        let skey = keys[3];
        let id = this.state.offeritems[tkey].offers[okey].specs[skey].id;
        await axios.delete(this.state.ip + '/transport/' + id + '/spec',
            {headers: this.state.header}).then(
            async (res) => {
                // console.log("=== del offer ===");
                // console.log(res);
                await this.requestTransport();
                this.moreOffer();
                this.updOffer();
            }
        )
    }

    async deleteOffer(event) {
        let keys = event.target.id.split('-');
        let tkey = keys[1];
        let okey = keys[2];
        let id = this.state.offeritems[tkey].offers[okey].id;
        await axios.delete(this.state.ip + '/transport/' + id + '/offer',
            {headers: this.state.header}).then(
            async (res) => {
                console.log("=== del offer ===");
                console.log(res);
                await this.requestTransport();
                this.moreOffer();
                this.updOffer();
            }
        )
    }

    async updateTransport(transport, id) {
        console.log(transport);
        await axios.put(this.state.ip + '/transport/' + id, transport,
            {headers: this.state.header}).then(
            async (res) => {
                await this.requestTransport();
                this.moreOffer();
                this.updOffer();
            }
        )
    }

    updTransport(event) {
        let key = event.target.id.split('-')[1];
        let titem = this.state.offeritems[key];
        titem.name = document.getElementById('titem' + key).value;
        let c1 = -1;
        let oitem;
        let str = 'oitem-' + key + "-";
        while ((oitem = document.getElementById(str + (++c1)))) {
            let offer = titem.offers[c1];
            offer.name = oitem.value;
            let c2 = -1;
            let spec;
            let str2 = key + '-' + c1 + '-';
            while ((spec = document.getElementById('spec-' + str2 + (++c2)))) {
                let specs = offer.specs[c2];
                specs.name = document.getElementById('sitemName-' + str2 + c2).value;
                specs.unity = document.getElementById('sitemUnity-' + str2 + c2).value;
                specs.minValue = document.getElementById('sitemMinValue-' + str2 + c2).value;
                specs.price = document.getElementById('sitemPrice-' + str2 + c2).value;
            }
        }
        this.updateTransport(titem, titem.id);
    }

    updOffer() {
        let Offers =
            <div className="mt-5">
                {this.state.offeritems.map((datatransport, i1) =>
                    <ul key={"transport-" + i1} style={{border: 2 + "px red solid"}}>
                        <br/>
                        <button id={"delTransport-" + i1} onClick={this.delTransport}>Delete</button>
                        <button id={"updateTransport-" + i1} onClick={this.updTransport}>Update</button>
                        <br/>
                        <label htmlFor={'titem-' + i1}>
                            Name :
                        </label>
                        <input type={"text"} id={"titem" + i1}
                               defaultValue={datatransport.name}/>
                        <button id={'addOffer-' + i1} onClick={this.addOffer}>Add Offer</button>
                        {datatransport.offers.map((dataoffer, i2) =>
                            <ul key={'offer-' + i1 + '-' + i2}>
                                <button id={'deleteOffer-' + i1 + '-' + i2} onClick={this.deleteOffer}>Delete</button>
                                <label htmlFor={"oitem-" + i1 + "-" + i2}>
                                    Offer:
                                </label>
                                <input id={"oitem-" + i1 + "-" + i2} type={"text"}
                                       defaultValue={dataoffer.name}/>
                                <button id={'addSpec-' + i1 + '-' + i2} onClick={this.addSpec}>Add Spec</button>
                                {dataoffer.specs.map((dataspec, i3) =>
                                    <ul key={'speckey-' + i1 + '-' + i2 + '-' + i3}
                                        id={'spec-' + i1 + '-' + i2 + '-' + i3}>
                                        <button id={'deleteSpec-' + i1 + '-' + i2 + '-' + i3}
                                                onClick={this.delteSpec}>Delete
                                        </button>
                                        <label htmlFor={'sitemName-' + i1 + '-' + i2 + "-" + i3}>
                                            Name:
                                        </label>
                                        <input type={"text"} id={"sitemName-" + i1 + '-' + i2 + "-" + i3}
                                               defaultValue={dataspec.name}/>
                                        <br/>
                                        <label htmlFor={"sitemUnity-" + i1 + '-' + i2 + "-" + i3}>
                                            Unity:
                                        </label>
                                        <input type={"text"} id={'sitemUnity-' + i1 + '-' + i2 + "-" + i3}
                                               defaultValue={dataspec.unity}/>
                                        <br/>
                                        <label htmlFor={'sitemMinValue-' + i1 + '-' + i2 + "-" + i3}>
                                            Min Value:
                                        </label>
                                        <input type={'number'} id={'sitemMinValue-' + i1 + '-' + i2 + "-" + i3}
                                               defaultValue={dataspec.minValue}/>
                                        <br/>
                                        <label htmlFor={'sitemPrice-' + i1 + '-' + i2 + "-" + i3}>
                                            Price :
                                        </label>
                                        <input type={'number'} id={'sitemPrice-' + i1 + '-' + i2 + "-" + i3}
                                               defaultValue={dataspec.price}/>
                                    </ul>
                                )}
                            </ul>
                        )}
                    </ul>)}
            </div>;
        this.setState({upOffer: Offers});
    }

    render() {
        return (
            <div>
                <div id={"create"} hidden>
                    <button id="updateTransport" onClick={this.changeDisplay}>
                        Update
                    </button>
                    <button onClick={this.addTransport}>Create Transport</button>
                    <br/>
                    <label htmlFor="transportName">Name: </label>
                    <input type="text" id="transportName"/>
                    <button onClick={this.moreOffer}>Add offer</button>
                    {this.state.offer.map((data, i) =>
                        <ul key={"offer" + i}>
                            {data.offer}
                            {data.spec.map((spec, y) =>
                                <ul key={'spec' + i + y}>
                                    {spec}
                                </ul>
                            )}
                        </ul>
                    )}
                </div>
                <div id={"update"}>
                    <button id="createTransport" onClick={this.changeDisplay}>
                        Create
                    </button>
                    {this.state.upOffer}
                </div>
            </div>
        );
    }
}

export default transportFee