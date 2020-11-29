import React from 'react';
import '../resources/styles/train_neural.css'
import { getRequestUrl, getHttpParams } from '../utils/ApiHelper';
import Loader from './custom_views/Loader';
import TrainSuccess from './custom_views/TrainSuccess';
import { showStyle, hideStyle } from '../utils/StyleHelper';

class TrainNeural extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            urls : "",
            isLoading : false,
            isSuccess : false,
            isShowError : false
        }
        this.urlsChanged = this.urlsChanged.bind(this)
        this.onTrain = this.onTrain.bind(this)
        this.toogleSuccess = this.toogleSuccess.bind(this)
    }
    urlsChanged(event){
        if (event){
            var value = event.target.value
            this.setState({urls : value})
            if (this.state.isShowError){
                this.setState({isShowError : false})
            }
            
            //this.props.urlChanged(value)
        }
    }
    onTrain(){
        if (!this.state.urls.includes("http")){
            this.setState({isShowError : true})
            return
        }
        this.setState({isLoading : true, isShowError : false})
        var urls = []
        if (this.state.urls.includes("\n")){
            urls = this.state.urls.split("\n")
        } else if (this.state.urls.includes(",")){
            urls = this.state.urls.split(",")
        }

        var params = {'users' : urls.join(';')}
        console.log("addUsersToBD params = " + JSON.stringify(params))
        fetch(getRequestUrl() + "addUsersToBD", getHttpParams(params)).then((response) => response.json())
        .then((responseData) => {
            this.setState({isLoading : false, isSuccess : true})
            console.log("addUsersToBD = " + JSON.stringify(responseData))
        })
    }
    toogleSuccess(){
        this.setState({isSuccess : !this.state.isSuccess})
    }
    render() {
        return (
            <div style={this.props.style} className="center_container_absolute"> 
                <div className="container_train_neural">
                    <p className="train_neural_title">Обучить сетку</p>
                    <p className="train_neural_description">Вставьте ссылки на аккаунты Вк для обучения нейросети. Чтобы вставить сразу несколько ссылок, используйте в качестве резделителя запятую</p>
                    <div style={!this.state.isShowError ? {} : {border : '0.5px solid #FF6262'}} className="enter_links_container">
                        <textarea value={this.state.urls} onChange={this.urlsChanged} placeholder="Ссылки на аккаунты Вк, например, https://vk.com/rabchanova" className="enter_links"/>
                    </div>
                    <div className="flex">
                        <div onClick={this.onTrain} style={this.state.urls == "" ? {pointerEvents : 'none', opacity : 0.2} : {}} className="train_button hover">Обучить</div>

                        {this.state.isShowError && <p className="train_error_text">Неверный формат ссылки</p>}
                    </div>
                    
                </div>
                <div style={(this.state.isLoading || this.state.isSuccess) ? showStyle() : hideStyle()} className="loader_train_container">
                    {this.state.isLoading && <Loader text="Идёт обучение нейросети"/>}
                    {this.state.isSuccess && <TrainSuccess showSearchPhoto={this.props.showSearchPhoto} toogleSuccess={this.toogleSuccess}/>}
                </div>
               
            </div>
        );
    }
}
export default TrainNeural;