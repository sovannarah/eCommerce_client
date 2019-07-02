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
				offeritems: []
			};
		this.transportdata = null;
		this.getTransport = this.getTransport.bind(this);
		this.addTransport = this.addTransport.bind(this);
		this.moreOffer = this.moreOffer.bind(this);
	}

	componentDidMount()
	{
		this.moreOffer();
		axios.get(this.state.ip +  '/transport',
			{ headers: this.state.header }).then(
			(res) =>
			{
				console.log("===== rres =====");
				this.setState({offeritems: res.data});
			},
			(error) =>
			{
				console.log("====== errr ========");
				console.log(error);
			}
		)
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
		console.log(transport);
		axios.post(this.state.ip + '/transport',
			transport ,
			{ headers: this.state.header }).then(
			(res) =>
			{
				console.log(res);
			},
			(err) =>
			{
				console.log(err);
			}
		)
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

	updOffer()
	{
		let upOffer =
			<div>
				{this.state.offeritems.map((datatransport, i) =>
					<ul key={"transport" + i}>
						<label htmlFor={'titem' + i}>
							Name :
						</label>
						<input type={"text"} id={"titem" + i}
							defaultValue={datatransport.name}/>
						{datatransport.offers.map((dataoffer, i2) =>
							<ul key={'offer' + i}>
								<label htmlFor={"oitem" + i2}>
									Offer:
								</label>
								<input id={"oitem"} type={"text"}
								       defaultValue={dataoffer.name}/>
								{ dataoffer.specs.map((dataspec, i3) =>
									<ul key={'data' + i}>
										<label htmlFor={'sitemName' + i3}>
											Name:
										</label>
										<input type={"text"} id={"sitemName" + i3}
											defaultValue={dataspec.name}/>
										<label htmlFor={"sitemUnity" + i3}>
											Unity:
										</label>
										<input type={"text"} id={'sitemUnity' + i3}
										       defaultValue={dataspec.unity} />
										<label htmlFor={'sitemMinValue' + i3}>
											Min Value:
										</label>
										<input type={'number'} id={'sitemMinValue' + i3}
										       defaultValue={dataspec.minValue}/>
										<label htmlFor={'sitemPrice'}>
											Price :
										</label>
										<input type={'number'} id={'sitemPrice' + i3}
										       defaultValue={dataspec.price}/>
									</ul>
								)}
							</ul>
						)}
					</ul>
				)}
			</div>
	}
	render()
	{
		return(
			<div>
				<div id={"create"}>
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
					<button id="createTransport" onClick={this.changeDisplay} hidden>
						Create
					</button>
					{this.state.offeritems.map((data, offerkey) =>
					<ul key={'offerKey' + offerkey}>
						<p>{data.name}</p>
					</ul>
					)}
				</div>
			</div>
		);
	}
}

export default transportFee