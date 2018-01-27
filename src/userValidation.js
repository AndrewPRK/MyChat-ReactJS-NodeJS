import React from "react"
import {connect} from "react-redux"
import {addNewUser} from "./AC"
class UserValidation extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            userName:"",
            userAvatar:"",
            validated:true
        };
        this.getName=this.getName.bind(this);
        this.getAvatar=this.getAvatar.bind(this);
    }
    render(){
        return(
            
                <div className="login-page">
                <div className="form">
                {this.state.validated?(<form className="register-form">
                  <input type="text" placeholder="name" value={this.state.userName} onChange={this.getName}/>
                      <input type="text" placeholder="avatar url" value={this.state.userAvatar} onChange={this.getAvatar}/>
                      <button onClick={this.validate}>Login</button>
                  </form>):(<div>
                <h1 style={{color:"green", font:"10px", lineHeight:"30px"}}>Not a valid name. Retry?</h1>
                <button onClick={()=>{location.reload();}}>Yes</button>
            </div>)}
                </div>
              </div>
            
        );
    }
    getAvatar=(event)=>
    {
        
        this.setState(
            {
                userAvatar:event.target.value
            }
        )
    }
    getName=(event)=>
    {
        this.setState(
            {
                userName:event.target.value
            }
        )
    }
    validate=(event)=>
    {
        event.preventDefault();
        if(!this.state.userName||!this.state.userName.trim().length)
        {
            return this.setState({
                validated:false
           })
        }
        
        this.setState({
            validated:true
       });
       const Avatar=this.state.userAvatar?this.state.userAvatar:"https://www.phplivesupport.com/pics/icons/avatars/public/avatar_86.png";
       this.props.addNewUser(this.state.userName,Avatar);
       return this.props.getState(true)
    }
}
export default connect(null,{addNewUser})(UserValidation)