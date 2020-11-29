import React from 'react';
import '../../resources/styles/loaders.css'
import { showStyle, hideStyle } from '../../utils/StyleHelper';
class LoaderInfo extends React.Component {
    constructor(props){
        super(props)

    }
    
    render(){
            return (
                <div style={this.props.style} className="lds-ring center">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <p className="loader_text">{this.props.text}</p>
                </div>
            );         
    }
}
export default LoaderInfo;
