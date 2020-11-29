import React from 'react';
import sad from '../../resources/icons/sad.svg'
class InfoError extends React.Component {
    constructor(props){
        super(props)

    }
    
    render(){
            return (
                <div style={this.props.style} className="center">
                    <img className="center_vertical icon_success" src={sad}/> 
                    <p className="loader_text">Искали-искали и не нашли</p>
                </div>
            );         
    }
}
export default InfoError;
