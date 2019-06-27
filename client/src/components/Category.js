import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Arrow from '../images/icon/arow-r.png';

/**
 * @param split url to get the last value
 */
let FullUrl = window.location.pathname;
const url = FullUrl.split("/")[2];

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			data: {},
			check: false
		};
		this.ip = 'http://127.0.0.1:8000';
	}
	async componentDidMount() {
		/**
		 * @param show category user click on
		 */
		axios.get(this.ip + '/category/'+ url +'/article')
			.then(
				(res) => {
					this.setState({ data: res.data })
					this.setState({ check: true })

				},
				(err) => {
					console.log(err);
				})
	}


	render() {
		if (this.state.check) {
			return (
				
				<section id="ctn-articles" className="container-fluid d-flex">
                <ul className="col-md-12 row d-flex justify-content-center">
                {this.state.data.map((item, index) => (
                    <Card key={index} className="ctn-popular m-3 col-md-4">
					<Link to={`/article/${ item.id }`}>
						<CardActionArea>
							<CardHeader
								title={item.title}
								subheader={`$${item.price}`}
							/>
							<div className="ctn-img d-flex">
								<img id="popular-img" className="m-auto" src={require('../API/Api/public/uploads/images/' + item.images[0])} />
							</div>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{ item.description }
								</Typography>
							</CardContent>
						</CardActionArea>
					</Link>
				</Card>
                ))}
                </ul>
            </section> 
			);
		} else {
			return <div></div>
		}
	}
}

export default Category;