import React from 'react';
import Toolbar from './custom_views/Toolbar';
import TrainNeural from './TrainNeural';
import { hideStyle, showStyle } from '../utils/StyleHelper';
import SearchByPhoto from './SearchByPhoto';
import Info from './custom_views/Info';

class Main extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            isTrainNeural : true,
            isShowInfo : false,
            pickedImageUrl : "",
            infoHeight : 0
        }
        this.onToolbarChanged = this.onToolbarChanged.bind(this);
        this.showSearchPhoto = this.showSearchPhoto.bind(this);
        this.toogleShowRating = this.toogleShowRating.bind(this);
        this.setPickedImageUrl = this.setPickedImageUrl.bind(this);
        this.pickPhotoClicked = this.pickPhotoClicked.bind(this);
        this.getInfoHeight = this.getInfoHeight.bind(this);
    }
    onToolbarChanged(isTrainNeural){
        this.setState({isTrainNeural : isTrainNeural})
        if (isTrainNeural){
            this.setState({infoHeight: 0, isShowInfo : false})
        } else {

        }
    }
    showSearchPhoto(){
        this.setState({isTrainNeural : false})
    }
    toogleShowRating(){
        if (this.state.isShowInfo){
            this.setState({infoHeight: 0})
        }
        this.setState({isShowInfo : !this.state.isShowInfo})
    }
    setPickedImageUrl(pickedImageUrl){
        this.setState({pickedImageUrl : pickedImageUrl})
    }
    pickPhotoClicked(){
        this.setState({isShowInfo : false})
    }
    getInfoHeight(infoHeight){
        this.setState({infoHeight : infoHeight})
        console.log("infoHeight = " + infoHeight)
    }
   
    render() {
        return (
            <div className="main_content">
                <div className="half_top"></div>
                <div style={(this.state.infoHeight != 0 && this.state.isShowInfo) ? {height : ((this.state.infoHeight + 36) + 'px')} : {}} className="half_bottom"></div>
                <Toolbar isTrainNeural={this.state.isTrainNeural} onToolbarChanged={this.onToolbarChanged}/>
                <div className="center_container">
                    <TrainNeural style={this.state.isTrainNeural ? showStyle() : hideStyle()} showSearchPhoto={this.showSearchPhoto}/>
                    <SearchByPhoto setPickedImageUrl={this.setPickedImageUrl} pickPhotoClicked={this.pickPhotoClicked} toogleShowRating={this.toogleShowRating} style={!this.state.isTrainNeural ? showStyle() : hideStyle()}/>
                </div>
                {this.state.isShowInfo && <Info getInfoHeight={this.getInfoHeight} pickedImageUrl={this.state.pickedImageUrl} isShowInfo={this.state.isShowInfo}/>}
            </div>
        );
    }
}
export default Main;