import React from 'react';
import success_icon from '../../resources/icons/success_icon.svg'
class TrainSuccess extends React.Component {
    constructor(props){
        super(props)

    }
    
    render(){
            return (
                <div className="center">
                    <img className="center_vertical icon_success" src={success_icon}/> 
                    <p className="loader_text">Обучение прошло успешно!</p>
                    <div onClick={this.props.showSearchPhoto} className="train_button hover btn_success center_vertical">к поиску по фото</div>
                    <p onClick={this.props.toogleSuccess} className="text_success hover center_vertical">Продолжить обучение</p>
                </div>
            );         
    }
}
export default TrainSuccess;
