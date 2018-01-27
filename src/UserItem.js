import React from "react"

export default class UserItem extends React.Component {

    render() {
        return (
            <div  className="clearfix">
                <img src={this.props.user.userAvatar} alt="avatar" />
                <div className="about">
                    <div className="name">{this.props.user.userName}</div>
                    <div className="status">
                        <i className="fa fa-circle online"></i> online
                    </div>
                </div>
            </div>
        );

    }
}