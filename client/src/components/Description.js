import React from 'react';





class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: null,
            isOpen: false
        }
        this.containerDiv = React.createRef();
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = e => {
        if (this.containerDiv.current.contains(e.target))
            return;
        this.close();
    }

    open = item => {

        //TODO: API call to get item data
        this.setState({
            produit: item,
            isOpen: true
        })
    };

    close = () => {
        this.setState({
            isOpen: false
        });
    };

    render() {
        var brand= this.props.brand;
        var sndName = this.props.sndName;
        var price = this.props.price;
        var description = this.props.description;

        return (

            <div ref={this.containerDiv} id='desc' className='desc'>
                <div style={{ width: '43vw' }}>
                    <div className='ctn-brand d-flex flex-column'>
                    <h3 className={"title"}>{brand}</h3>
                    <h3 className={"model"}>&#8212; {sndName} &#8212;</h3>
                    </div>
                    <div className={"price_font"}>&euro; {price}</div>
                    
                        <button className="justify-content-center">ADD TO CART</button>
                    
                    <div className={"descript"}>
                        <p className={"bold"}>DESCRIPTION</p>
                        <p>{description}</p>
                        </div>

                </div>
            </div>

        );
    }
}

export default Description;