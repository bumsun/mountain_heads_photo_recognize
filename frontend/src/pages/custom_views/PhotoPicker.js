import React from 'react';
import pickture from '../../resources/icons/pickture.svg'
import { getRequestUrl } from '../../utils/ApiHelper';
import ImageLoader from './ImageLoader';
var img = new Image; 
var fr = new FileReader;
var pickedFile = {}
class PhotoPicker extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            pickedImageUrl: "",
            isImageLoading : false
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.fileUpload = React.createRef();
        this.pickImage = this.pickImage.bind(this);
    }

    fileChangedHandler(event) {
        if(event && event.target.files && event.target.files.length > 0){
            this.uploadFile(event.target.files[0])
        }
       
    }

    uploadFile = (file) => {
        console.log("file data = " + file)
        this.setState({isImageLoading : true})
        pickedFile = file
        fr.onload = this.onLoadedFileReader
        fr.readAsDataURL(file);
    }
    onImgLoaded = () => {
        this.uploadToServer(pickedFile)
    }
    onLoadedFileReader = () => {    
        img.onload = this.onImgLoaded
        img.src = fr.result;
    }
    pickImage() {
        this.props.pickPhotoClicked()
        this.fileUpload.current.click();
    }
    uploadToServer = (file) => {
        var data = new FormData()
        data.append('file1', file)
        console.log("uploadFile data = " + JSON.stringify(data))
        fetch("https://upmob.ru/api/uploadFile", {
            method: 'POST',
            mimeType: "multipart/form-data",
            body: data
        }).then((response) => response.json())
        .then((responseData) => {
            if (responseData.response == 1){
                this.setState({pickedImageUrl : responseData.url})
                this.props.photoLoaded(responseData.url)
            } 
            this.setState({isImageLoading : false})
            
        })
    }
    render() {
        return (
            <div style={this.props.style} className="center_vertical">
                <div onClick={this.pickImage} className="hover">
                    <img className="pickture_icon center_vertical" src={this.state.pickedImageUrl == "" ? pickture : this.state.pickedImageUrl}/>
                    {this.state.isImageLoading && <ImageLoader/>}
                    <p className="pickture_description center_vertical">{this.state.pickedImageUrl == "" ? "Загрузить фотографию" : "Загрузить другую фотографию"}</p>
                    <input id="fileInput" className="custom-file-input hover" type="file" accept="image/*" onChange={this.fileChangedHandler} style={{ display: "none" }} ref={this.fileUpload}/>
                </div>
            </div>
        );
    }
}
export default PhotoPicker;