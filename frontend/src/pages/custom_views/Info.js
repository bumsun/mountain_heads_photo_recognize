import React from 'react';
import Loader from './Loader';
import { getRequestUrl, getHttpParams } from '../../utils/ApiHelper';
import stats from '../../resources/icons/stats.svg'
import help_circle from '../../resources/icons/help_circle.svg'
import card1 from '../../resources/icons/card1.svg'
import card2 from '../../resources/icons/card2.svg'
import card3 from '../../resources/icons/card3.svg'
import Social from './Social';
import Work from './Work';
import Company from './Company';
import Risk from './Risk';
import { getEpmtyModel, getScoreColor } from '../../utils/Utils';
import LabelItem from './LabelItem';
import { showStyle, hideStyle, showStyleHeight, hideStyleHeight } from '../../utils/StyleHelper';
import LabelsLoader from './LabelLoader';
import LoaderInfo from './LoaderInfo';
import InfoError from './InfoError';
var height = 0
class Info extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading : this.props.isShowInfo,
            pickedImageUrl : "",
            landmarks : undefined,
            groupsInfo : undefined,
            scoreGroups : 0.0,
            scoreLabels : 0.0,
            info : {}
        }
        this.isLoading = false
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            this.setState({pickedImageUrl : this.props.pickedImageUrl})
            this.loadInfo(this.props.pickedImageUrl)
            this.getHeight()
        }
    }
    componentDidMount(){
        this.loadInfo(this.props.pickedImageUrl)
        this.getHeight()
    }
    getHeight = () => {
        var currentHeight = document.getElementById('infoContainer').offsetHeight;
        console.log("currentHeight = " + currentHeight)
        if (currentHeight != height){
            height = currentHeight
            this.props.getInfoHeight(height)
        }
        
    }
    loadInfo = (url) => {
        if (url != "" && !this.isLoading && this.props.isShowInfo){
           // this.convertLandmarks(getEpmtyModel())
            this.isLoading = true
            this.setState({isLoading : true})
            var params = {'photo' : url}
            fetch(getRequestUrl() + "findFace", getHttpParams(params)).then((response) => response.json())
            .then((responseData) => {
                this.isLoading = true
                this.setState({info : responseData, isLoading : false})
                if (responseData.vkInfo != undefined && responseData.vkInfo.id != undefined){
                    this.loadGroups(responseData.vkInfo.id)
                    this.loadLabels(responseData.vkInfo.id)
                }
                console.log("findFace = " + JSON.stringify(responseData))
            })
            
            
        }  
    }
    loadLabels = (user_id) => {
        var params = {'user_id' : user_id}
        fetch(getRequestUrl() + "detectLandMarks", getHttpParams(params)).then((response) => response.json())
        .then((responseData) => {
            this.convertLandmarks(responseData)
            console.log("detectLandMarks = " + JSON.stringify(responseData))
        })
    }
    loadGroups = (user_id) => {
        var params = {'user_id' : user_id}
        fetch(getRequestUrl() + "getGroupsInfo", getHttpParams(params)).then((response) => response.json())
        .then((responseData) => {
            this.setState({groupsInfo : responseData, scoreGroups : responseData.solvency})
            console.log("getGroupsInfo = " + JSON.stringify(responseData))
        })
    }
    convertLandmarks = (landmarks) => {
        landmarks.convertedLandmarks = []
        for (var key in landmarks.tagsFromPhoto) {
            if (landmarks.tagsFromPhoto.hasOwnProperty(key)) {
                landmarks.convertedLandmarks.push({name : key, count : landmarks.tagsFromPhoto[key]})
            }
        }
        this.setState({landmarks : landmarks, scoreLabels : landmarks.solvency})

    }
    calcScore = () => {

    }
    render(){
            var score = parseInt((this.state.scoreGroups + this.state.scoreLabels + 10)*62.5)
            var scoreStyle = getScoreColor(score)
            var name = ""
            if (this.state.info.vkInfo != undefined){
                name = this.state.info.vkInfo.last_name + " " + this.state.info.vkInfo.first_name
            }
            return (
                // <div className={this.props.isShowInfo ? "info_container info_container_visible" : "info_container"}>
                <div style={this.props.isShowInfo ? showStyleHeight() : hideStyleHeight()} id="infoContainer" className="info_container_standart">
                    {(!this.state.isLoading && this.state.info.vkInfo.id != undefined) && <div className="info_container_inner">
                        <div className="flex just_content">
                            <p className="info_title">{name}</p>
                            <div className="relative">
                                <img className="info_stats_icon" src={stats}/>
                                <div className="center_vertical info_stats_container">
                                    {(this.state.groupsInfo != undefined && this.state.landmarks != undefined) ? <div>
                                        <div style={scoreStyle} className="counter_info m_left_30">{this.state.scoreLabels != "" ? score : "   "}</div>
                                        <div className="flex">
                                            <p className="info_stats_desc">рейтинг клиента</p>
                                            <img className="info_stats_icon_q hover" src={help_circle}/>
                                        </div>
                                    </div> :
                                    <LabelsLoader isShowInfo={true} text=""/>}
                                </div>
                            </div>
                        </div>
                        <p className="personal_title">Персональные предложения</p>
                        <div className="personal_container">
                            <img className="personal_icon hover" src={card1}/>
                            <img className="personal_icon hover" src={card2}/>
                            <img style={{marginRight : '32px'}} className="personal_icon hover" src={card3}/>
                        </div>

                        <div className="flex">
                            <div className="half_info_cont half_info_cont_left">
                                <Social labels={this.state.landmarks} info={this.state.info}/>
                                <Risk info={this.state.info}/>
                            </div>
                            <div className="half_info_cont half_info_cont_right">
                                <Work info={this.state.info}/>
                                <Company info={this.state.info}/>
                            </div>
                        </div>
                        <div className="line"/>
                        <p className="personal_title">Дополнительно</p>
                        <div className="labels_container">
                            {this.state.landmarks == undefined ? 
                                <LabelsLoader isShowInfo={true} text=""/> : 
                                    this.state.landmarks.convertedLandmarks.length > 0 && this.state.landmarks.convertedLandmarks.map((item, index) => (
                                            <LabelItem label={item} index={index} key={index}/>
                                    ))
                            }
                        </div>
                    </div>}
                    

                    {this.state.isLoading && <LoaderInfo style={{position: 'absolute'}} isShowInfo={this.state.isLoading} text="Ищем и анализируем данные"/>}
                    {(!this.state.isLoading && this.state.info.vkInfo.id == undefined) && <InfoError style={{position: 'absolute'}}/>}
                </div>
                
            );         
    }
}
export default Info;
