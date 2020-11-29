import React from 'react';
import '../../resources/styles/loaders.css'
class ImageLoader extends React.Component {
    constructor(props){
        super(props)

    }
    
    render(){
            return (
                <div className="pickture_loader center_vertical">
                    <div className="lds-ring-pickture center">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                    </div>
                </div>
            );         
    }
}
export default ImageLoader;
