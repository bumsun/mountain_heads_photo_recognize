import React from 'react';

class LabelItem extends React.Component {
    constructor(props){
        super(props)
             
        
    }
   
    render() {
        return (
            <div className="label_container just_content">
                <p className="label_text">{this.props.label.name}</p>
                <p className="label_text_bold">{this.props.label.count}</p>

            </div>
           
        );
    }
}
export default LabelItem;

