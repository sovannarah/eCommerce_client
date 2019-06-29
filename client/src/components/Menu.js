import React from 'react';
import '../style/css/menu.css';
import axios from 'axios';

let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];
const urlPos = FullUrl.split("/")[1];

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: [],
            check: false,
            category: [],
			currCategorie : []
        };
        this.ip = 'http://127.0.0.1:8000';
        this.parseCategory = this.parseCategory.bind(this);
		this.Getcategory = this.Getcategory.bind(this);
    }

    
    async componentDidMount() {
        let data2 = await this.Getcategory();
            this.setState({currCategorie: [data2]})
            this.parseCategory(this.state.currCategorie);
            this.forceUpdate()

        /**
         * @param get all the categories
         */
        axios.get(this.ip + '/category')
            .then(
                (res) => {
                    let cat = this.state.category;
                    if(urlPos === "category") {
                        for(let i = 0; i < cat.length; i++) {
                            this.state.data.push(cat[i])
                        }
                    
                    } else {
                        this.setState({ data: res.data });
                    }
                    this.setState({ check: true });
                },
                (err) => {
                    // console.log(err);
                })
            
            
    }

    parseCategory(data)
	{
		let c = -1;
		while (data[++c]) {
			this.state.category.push(data[c])
			if (data[c].children && data[c].children.length > 0){
				this.parseCategory(data[c].children);
			}
		}

	}

	Getcategory()
	{
		return axios.get(this.ip + '/category/' + url)
			.then(res => {
                console.log(res.data)
				return (res.data)
			})
			.catch(err => {
				console.log(err);
			})
	}



    render() {
        if (this.state.check) {
            return (
                <div id="menu" className="wrapper">
                    <div className="wrapper">
                        <ul className="w-100">
                        <li className="list-menu d-flex justify-content-center">
                                    <a className="m-auto" href={"/"}>
                                       Menu
                                    </a>
                                </li>
                            {this.state.data.map((elem, i) => (
                                <li className="list-menu d-flex justify-content-center" key={i}>
                                    <a className="m-auto" href={"/category/" + elem.id}>
                                        {elem.name[0].toUpperCase() + elem.name.substr(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default Menu;