import React from "react"
import Search from "./search"
import UserItem from "./UserItem"
export default class PeopleList extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="people-list" id="people-list">
                <Search/>
                {this.getBody()}
            </div>
        );
    }
    getBody(){
        const usersArr=this.props.users.map(
            (user)=>{
                return(
                        <li key={user.userId}><UserItem  user={user}/></li>
                );
            }
        )
        return (<ul className="list">{usersArr}</ul>)
    }
}



