import React from 'react';
import '../../resources/styles/loaders.css'
import { showStyle, hideStyle } from '../../utils/StyleHelper';
class LabelsLoader extends React.Component {
    constructor(props){
        super(props)

    }
    
    render(){
            return (
                <div style={{}} className="lds-ring-pickture center">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <p className="loader_text">{this.props.text}</p>
                </div>
            );         
    }
}
export default LabelsLoader;
