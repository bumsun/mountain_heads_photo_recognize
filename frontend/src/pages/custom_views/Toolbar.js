import React from 'react';
import mountainheads from '../../resources/icons/mountainheads.svg'
class Toolbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isTrainNeural : this.props.isTrainNeural            
        }       
        
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            this.setState({isTrainNeural : this.props.isTrainNeural})
        }
    }
    openAbout = () => {
        this.props.onToolbarChanged(true)
    }
    closeAbout = () => {
        this.props.onToolbarChanged(false)
    }
   
    render() {
        return (
            <div className="toolbar_info">
                <div className="toolbar_info_cont">
                    <div className="toolbar_title">
                        <p onClick={this.openAbout} style={this.state.isTrainNeural ? {color : '#333333'} :{color : '#34B2ED'}} className="toolbar_title_text">Обучить сетку</p>
                        <p onClick={this.closeAbout} style={this.state.isTrainNeural ? {color : '#34B2ED'} :{color : '#333333'}} className="toolbar_title_text toolbar_title_text_40">Искать по фото</p>
                       
                    </div>
                    <div className="toolbar_line_container">
                        <div style={this.state.isTrainNeural ? {marginLeft : '0px'} : {marginLeft : '147px'}} className="toolbar_line">

                        </div>
                    </div>
                </div>
               <img className="app_icon" src={mountainheads}/>
            </div>
           
        );
    }
}
export default Toolbar;

