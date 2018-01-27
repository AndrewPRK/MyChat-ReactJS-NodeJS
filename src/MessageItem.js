import React from "react"

export default class MessageItem extends React.Component
{
    
    render(){
        return(
            <div className="clearfix" >
            {this.getHeader()}
            <div className={(this.props.message.userId!=this.props.myUserId)?"message other-message float-right":"message my-message"} style={{background:this.props.message.color}}>
                {this.props.message.text}
            </div>
        </div>
        );
    }
getHeader()
{
    if(this.props.message.userId!=this.props.myUserId){

    return(<div className={"message-data align-right"}>
                <span className="message-data-time" >{new Date(this.props.message.time).getHours()+" : "+new Date(this.props.message.time).getMinutes()}, Today</span> &nbsp; &nbsp;
                <span className="message-data-name" >{this.props.message.author}</span> <i className="fa fa-circle me"></i>
            </div>)
    }
    else 
    return(
        <div className="message-data">
        <span className="message-data-name"><i className="fa fa-circle online"></i> {this.props.message.author}</span>
        <span className="message-data-time">{new Date(this.props.message.time).getHours()+" : "+new Date(this.props.message.time).getMinutes()}, Today</span>
      </div>
    )
    
}
}
