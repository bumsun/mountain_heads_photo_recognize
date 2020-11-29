import React from 'react';
import pickture from '../resources/icons/pickture.svg'
import '../resources/styles/search.css'
import PhotoPicker from './custom_views/PhotoPicker';
import { hideStyle, showStyle } from '../utils/StyleHelper';
import Info from './custom_views/Info';

class SearchByPhoto extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            pickedImageUrl : ""
        }
        this.findRating = this.findRating.bind(this);
        this.photoLoaded = this.photoLoaded.bind(this);
    }
    findRating(){
        this.props.toogleShowRating()
    }
    photoLoaded(pickedImageUrl){
        this.setState({pickedImageUrl : pickedImageUrl})
        this.props.setPickedImageUrl(pickedImageUrl)
    }
    render() {
        return (
            <div style={this.props.style} className="center_container_absolute">
                <PhotoPicker pickPhotoClicked={this.props.pickPhotoClicked} photoLoaded={this.photoLoaded}/>
                <div onClick={this.findRating} style={this.state.pickedImageUrl == "" ? hideStyle() : showStyle()} className="train_button search_btn btn_success center_vertical top_16">найти рейтинг</div>
                
                
            </div>
        );
    }
}
export default SearchByPhoto;