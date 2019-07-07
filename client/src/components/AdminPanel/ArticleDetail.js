import React from 'react';
import Axios from 'axios';

let article = null;
class ArticleDetail extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
			{
				article: {},
				variantsT: []
			};
		this.ip = 'http://127.0.0.1:8000';
		this.header = {
			token: localStorage.getItem('token')
		};
		this.article = article;
		this.variants = article.variants;
		this.addVariant = this.addVariant.bind(this);
		this.getVariant = this.getVariant.bind(this);
		this.deleteVariant = this.deleteVariant.bind(this);
		this.sendSave = this.sendSave.bind(this);
		this.getSpec = this.getSpec.bind(this);
		this.changePrice = this.changePrice.bind(this);
		this.changeImput = this.changeImput.bind(this);
	}

	componentDidMount()
	{
		Axios.get(this.ip + '/article/' + this.article.id,
			{
				headers : this.header
			}).then(
			(resp) =>
			{
				this.setState({article: resp.data});
			},
			(err) =>
			{
				console.log(err);
			}
		);
		this.getVariant();
	}

	getVariant() {
		let pages = [];
		let varKeys = Object.keys(this.variants);
		let c1 = -1;
		while (varKeys[++c1])
		{
			let varian = {name: varKeys[c1], spec: []};
			let c2 = -1;
			let vars;
			while ((vars = this.variants[varKeys[c1]][++c2]))
			{
				vars.var_price = parseInt(vars.var_price) / 100;
				varian.spec.push(vars);
			}
			pages.push(varian);
		}
		this.setState({variantsT: pages});
	}

	addVariant(event)
	{
		event.preventDefault();
		let variant =
			{
				spec: '',
				var_price: 0,
				type: '',
			};

		let articletmp = this.state.variantsT;
		if (articletmp.length === 0)
			articletmp.push({name: 'new', spec: []});
		articletmp[0].spec.push(variant);
		this.setState({variantsT: articletmp});
	}

	async sendSave(event)
	{
		event.preventDefault();
		this.article.variants = await this.getSpec();
		// this.article.variants
		console.log(this.article);
		Axios.post(this.ip + '/article/' + this.article.id,this.article,
			{ headers: this.header }).then(
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

	getSpec()
	{
		let table = this.state.variantsT;
		return (new Promise((resolve =>
		{
			let len = table.length;
			let c = -1;
			let specs = [];
			while (++c < len)
			{
				let c2 = -1;
				while (table[c].spec[++c2])
				{
					specs.push(table[c].spec[c2]);
				}
			}
			resolve(specs);
		})));
	}

	deleteVariant(event)
	{
		event.preventDefault();
		let keys = event.target.id.split('-');
		let id = this.state.variantsT[keys[1]].spec[keys[2]].id;
		if (id === undefined)
		{
				let tmp = this.state.variantsT;
				console.log(tmp[keys[1]].spec[keys[2]]);
				tmp[keys[1]].spec.splice(keys[2], 1);
				this.setState({variantsT: tmp});
		}
		else
		{
		Axios.delete(this.ip + '/article/'+ id + '/variant',
			{headers: this.header}).then(
			(res) =>
			{
				let tmp = this.state.variantsT;
				tmp[keys[1]].spec.splice(keys[2], 1);
				this.setState({variantsT: tmp});
			},
			(err) =>
			{
				console.log(err);
			}
		);
		}
	}

	changePrice(event)
	{
		let tmp = this.state.variantsT;
		let keys = event.target.id.split('-');
		let price = tmp[keys[1]].spec[keys[2]].var_price;
		console.log(price);
		if (event.keyCode === 38 )
			price = price + 0.1;
		else if (event.keyCode === 40)
			price = price - 0.1;
		tmp[keys[1]].spec[keys[2]].var_price = parseFloat(price.toFixed(1));
		this.setState({variantsT: tmp});
	}

	changeImput(event)
	{
		let tmp = this.state.variantsT;
		let keys = event.target.id.split('-');
		console.log(keys);
		tmp[keys[1]].spec[keys[2]][keys[0]] = event.target.value;
		this.setState({variantsT: tmp});
	}

	render()
	{
		return(
			<div>
				<button>Back</button>
				<form>
					<label htmlFor={'articleTile'}>Title</label>
					<input type={"text"} value={this.article.title} name={"title"} id={"articleTitle"}/>
					<label htmlFor={"articleDescription"}>Description</label>
					<input type={"text"} value={this.article.description} name={"description"} id={"articleDescription"}/>
					<button type={"submit"} onClick={this.sendSave}>Save</button>
					<button onClick={this.addVariant}>Add Variant</button>
					{this.state.variantsT.map((data, i) =>
						<ul key={"variant-" + i}>
							{data.spec.map((spec, i2) =>
								<ul key={"varitant-" + i + '-' + i2}>
									<li><button id={'variant-' + i + '-' + i2} onClick={this.deleteVariant}>Delete</button></li>
									<li>
										<label htmlFor={"spec-" + i + '-' + i2}>
											Spec:
										</label>
										<input type={"text"} id={"spec-" + i + '-' + i2} value={spec.spec} onChange={this.changeImput} />
									</li>
									<li>
										<label htmlFor={'type-' + i + "-" + i2}>
											Type
										</label>
										<input type={"text"} value={spec.type} id={"type-" + i + '-' + i2} onChange={this.changeImput}/>
									</li>
									<li>
										<label htmlFor={'type-' + i + "-" + i2}>
											Var Price
										</label>
										<input type={"number"} id={'var_price-' + i + '-' + i2}
										value={spec.var_price} step={"0.1"} onKeyDown={this.changePrice}/>
									</li>
								</ul>
							)}
						</ul>)
					}
				</form>
			</div>
		);
	}
}

function addDetail(articleob)
{
	article = articleob;
	console.log(articleob);
}

export {ArticleDetail as default, addDetail};