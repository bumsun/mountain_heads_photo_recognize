import React from 'react';
import ReactDOM from 'react-dom';
import './resources/styles/style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Main from './pages/Main';

class Application extends React.Component {
    
    constructor(){
        super()
        this.state = {
            
           
        }
        // this.changePage = this.changePage.bind(this);
       
    }
   
   
    render() {
        return (
            
            
            <Router>
                <div className="app">
                    <Main/>
                </div>
             </Router>
        );
    }
}
export default Application;


