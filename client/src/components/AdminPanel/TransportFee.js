import React from 'react';
import axios from 'axios';
import {Promise} from "q";

class transportFee extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
			{
				header: { token: localStorage.getItem('token')},
				ip: 'http://127.0.0.1:8000',
				offer: [],
				offeritems: [],
				upOffer: ''
			};
		this.transportdata = null;
		this.getTransport = this.getTransport.bind(this);
		this.addTransport = this.addTransport.bind(this);
		this.updTransport = this.updTransport.bind(this);
		this.moreOffer = this.moreOffer.bind(this);
		this.updOffer = this.updOffer.bind(this);
		this.delTransport = this.delTransport.bind(this);
		this.requestTransport = this.requestTransport.bind(this);
		this.deleteOffer = this.deleteOffer.bind(this);
	}

	async componentDidMount()
	{
		await this.requestTransport();
		this.moreOffer();
		this.updOffer();
	}

	requestTransport()
	{
		return (new Promise (async (res) =>
		{
			await axios.get(this.state.ip +  '/transport',
				{ headers: this.state.header }).then(
				(res) =>
				{
					console.log("===== rres =====");
					this.setState({offeritems: res.data});
				}
			);
			res("ok");
		}));
	}

	changeDisplay(event)
	{
		let tDisplay = ['create', 'update'];
		let c = -1;
		while (tDisplay[++c])
		{
			if (tDisplay[c] + "Transport" !== event.target.id)
				document.getElementById(tDisplay[c]).hidden = true;
			else
				document.getElementById(tDisplay[c]).hidden = false;
		}
	}

	async addTransport()
	{
		let transport = await this.getTransport();
		let flag = false;
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
						price: document.getElementById('price' + pos).value
					};
					offerItem.spec.push(specItem);
				}
				transport.offer.push(offerItem);
			}
			resolve(transport);
		})));
	}

	async moreOffer()
	{
		let offert = this.state.offer;
		let len  = offert.length;
		let specHtml =
			<div id={"spec-" + len + "-0"} style={{ border: 2 + "px green solid"}}>
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
			<div id={ "offer" + len } style={{ border: 2 + "px red solid"}}>
				<label htmlFor={"offerName" + len }>
					Oferr Name:
				</label>
				<input type="text" id={"offerName"+ len }/>
				<button onClick={this.moreSpec.bind(this, len)}>
					Add Spec
				</button>
			</div>;
		offert.push({offer: offerHtml, spec:[specHtml]});
		this.setState({offer: offert});
	}

	moreSpec(len)
	{
		let offert = this.state.offer;
		let specHtml =
			<div id={"spec-" + len + "-" + offert[len].length}
			     style={{ border: 2 + "px green solid"}}>
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

	async delTransport(event)
	{
		let key = parseInt(event.target.id.split('-')[1]);
		let id = this.state.offeritems[key].id;
		await axios.delete(this.state.ip + '/transport/' + id,
			{headers: this.state.header}).then(
			async () =>
			{
				await this.requestTransport();
				this.moreOffer();
				this.updOffer();
			}
		);
	}

	async delteSpec(event)
	{
		let keys = event.target.id.split('-');
		let tkey = keys[1];
		let okey = keys[2];
		let skey = keys[3];
		let id = this.state.offeritems[tkey].offers[okey].specs[skey].id;
		await axios.delete(this.ip + '/transport/' + id +'/spec',
			{headers: this.state.header}).then(
			async (res) =>
			{
				console.log("=== del offer ===");
				console.log(res);
				// await this.requestTransport();
				// this.moreOffer();
				// this.updOffer();
			},
			(err)=>
			{
				console.log("=== del offer err ===");
				console.log(err);
			}
		)
	}
	async deleteOffer(event)
	{
		let keys = event.target.id.split('-');
		let tkey = keys[1];
		let okey = keys[2];
		let id = this.state.offeritems[tkey].offers[okey].id;
		await axios.delete(this.ip + '/transport/' + id +'/offer',
			{headers: this.state.header}).then(
			async (res) =>
			{
				console.log("=== del offer ===");
				console.log(res);
				// await this.requestTransport();
				// this.moreOffer();
				// this.updOffer();
			},
			(err)=>
			{
				console.log("=== del offer err ===");
				console.log(err);
			}
		)
	}

	async updateTransport(transport, id)
	{
		await axios.put(this.state.ip + '/transport/' + id, transport,
			{headers: this.state.header}).then(
			(res) =>
			{
				console.log("===== res ======")
				console.log(res);
			},
			(err) =>
			{
				console.log("===== err ======")
				console.log(err);
			}
		)
	}

	updTransport(event)
	{
		let key = event.target.id.split('-')[1];
		let titem = this.state.offeritems[key];
		titem.name = document.getElementById('titem' + key).value;
		let c1 = -1;
		let oitem;
		let str = 'oitem' + key + "-";
		while ((oitem = document.getElementById(str + (++c1))))
		{
			let offer = titem.offers[c1];
			offer.name = oitem.value;
			let c2 = -1;
			let spec;
			let str2 = key + '-' + c1 + '-';
			while ((spec = document.getElementById('spec-' + str2 + (++c2))))
			{
				let spec = offer.specs[c2];
				spec.name = document.getElementById('sitemName-' + str2 + c2).value;
				spec.unity = document.getElementById('sitemUnity' + str2 + c2).value;
				spec.minValue = document.getElementById('sitemMinValue' + str2 + c2).value;
				spec.price = document.getElementById( 'sitemPrice' + str2 + c2).value;
			}
		}
		this.updateTransport(titem, titem.id);
	}

	updOffer()
	{
		let Offers =
			<div>
				{this.state.offeritems.map((datatransport, i1) =>
					<ul key={"transport-" + i1} style={{ border: 2 + "px red solid"}}>
						<button id={"delTransport-" + i1} onClick={this.delTransport}>Delete </button>
						<button id={"updateTransport-" + i1} onClick={this.updTransport}>Update </button>
						<br />
						<label htmlFor={'titem-' + i1}>
							Name :
						</label>
						<input type={"text"} id={"titem" + i1}
						       defaultValue={datatransport.name}/>
						{datatransport.offers.map((dataoffer, i2) =>
							<ul key={'offer-' + i1 + '-' + i2}>
								<button id={'deleteOffer-' + i1 + '-' + i2} onClick={this.deleteOffer}>Delete</button>
								<label htmlFor={"oitem-" + i1 + "-" + i2}>
									Offer:
								</label>
								<input id={"oitem" + i1 + "-" + i2} type={"text"}
								       defaultValue={dataoffer.name}/>
								{ dataoffer.specs.map((dataspec, i3) =>
									<ul key={'spec-'+ i1 + '-' + i2 + '-'+ i3}>
										<button id={'deleteSpec-' + i1 + '-' + i2 + '-' + i3 }>Delete</button>
										<label htmlFor={'sitemName-' + i1 + '-' + i2 + "-" + i3}>
											Name:
										</label>
										<input type={"text"} id={"sitemName-"+ i1 + '-' + i2 + "-" + i3}
										       defaultValue={dataspec.name}/>
										<br />
										<label htmlFor={"sitemUnity-" + i1 + '-'+ i2 + "-" + i3}>
											Unity:
										</label>
										<input type={"text"} id={'sitemUnity-' + i1 + '-'+ i2 + "-" + i3}
										       defaultValue={dataspec.unity} />
										<br />
										<label htmlFor={'sitemMinValue-' + i1 + '-'+ i2 + "-" + i3}>
											Min Value:
										</label>
										<input type={'number'} id={'sitemMinValue-'+ i1 + '-' + i2 + "-" + i3}
										       defaultValue={dataspec.minValue}/>
										<br />
										<label htmlFor={'sitemPrice-' + i1 + '-'+ i2 + "-" + i3}>
											Price :
										</label>
										<input type={'number'} id={'sitemPrice-'+ i1 + '-' + i2 + "-" + i3}
										       defaultValue={dataspec.price}/>
									</ul>
								)}
							</ul>
						)}
					</ul>)}
			</div>;
		this.setState({upOffer: Offers});
	}

	render()
	{
		return(
			<div>
				<div id={"create"} hidden>
					<button id="updateTransport" onClick={this.changeDisplay}>
						Update
					</button>
					<button onClick={this.addTransport}>Create Transport</button>
					<label htmlFor="transportName">Name: </label>
					<input type="text" id="transportName"/>
					<button onClick={this.moreOffer}>Add offer</button>
					{ this.state.offer.map((data, i) =>
						<ul key={"offer" + i}>
							{ data.offer }
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
					{ this.state.upOffer }
				</div>
			</div>
		);
	}
}

export default transportFee