import React from "react"
import {connect} from "react-redux"
import {sendMessage} from "./AC"
 class MessageTextArea extends React.Component {
    constructor(props)
    {
        super(props)
        this.state=
        {
            message:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    handleChange(event)
    {
       // console.log(event.target.value)
        this.setState(
            {message:event.target.value}
        )
    }
    handleClick(event)
    {
        this.props.sendMessage(this.state.message);
        this.setState({
            message:""
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="chat-message clearfix">
                <textarea 
                name="message-to-send" id="message-to-send" 
                placeholder="Type your message" rows="3"
                value={this.state.message}
                onChange={this.handleChange}>
                </textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
                <button onClick={this.handleClick}>Send</button>
            </div>
        );
    }
}
export default connect(null,{sendMessage})(MessageTextArea)