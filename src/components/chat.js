import React from "react"
import MessagesList from "./MessagesList"
import PeopleList from "./PeopleList"
import {connect} from "react-redux"
import UserValidation from "./UserValidation"

class Chat extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            showChat: false
        }
    }
    render() {
        return(
            !this.state.showChat ?
            (<UserValidation getState = {this.userValidate}/>): 
            (<div className = "container clearfix">
                <PeopleList users = {this.props.users}/>  
                <MessagesList/>
        </div>)
        );
    }
    userValidate=(validationState)=>{
        this.setState({showChat:validationState});
    }
}

export default connect(
    (state)=>{return{users: state.users}}
)(Chat)