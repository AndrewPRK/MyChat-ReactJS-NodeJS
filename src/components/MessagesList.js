import React from "react"
import{connect} from "react-redux"
import MessageItem from "./MessageItem"
import MessageTextArea from "./MessageTextArea"

 class MessagesList extends React.Component {
    constructor(props){
        super(props);
        this.chatWrapper = null;
        this.chatUl = null;
    }
    componentDidUpdate() {
        this.chatWrapper.scrollTop = this.chatUl.scrollHeight;
    }
    render() {
        return (
            <div className = "chat">
                    <div className = "chat-header clearfix">
                        <img src = {this.props.userAvatar} alt = "avatar" />
                        <div className = "chat-about">
                            <div className = "chat-with">{this.props.userName}</div>
                        </div>
                        <i className = "fa fa-star"></i>
                    </div> 
                    {this.getMessage()}
                    <MessageTextArea/>
            </div>
        );
    }
    getMessage() {
        const messageArr = this.props.messages.map((mes, index) => {
            return(
                <li key={mes.time}><MessageItem message={mes} myUserId = {this.props.myUserId}/></li>
            );
        })
        return (
            <div className = "chat-history" ref = {chatWrapper => this.chatWrapper = chatWrapper}>
                <ul ref = {chatUl => this.chatUl = chatUl}>
                    {messageArr}
                </ul>
            </div>)
    }
}

export default connect((state) => {
    if(!state.users.length)
    {
        return {messages: state.messages, myUserId: 0, userAvatar: "0", userName: "0"}
    }
    return {messages: state.messages, myUserId: state.users[0].userId, userAvatar: state.users[0].userAvatar, userName:state.users[0].userName}
})(MessagesList)