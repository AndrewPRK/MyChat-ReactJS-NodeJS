import {ADD_NEW_USER,SEND_MESSAGE,ADD_CONNECTED_USERS} from "../constants"
import ws from "../Util/ws"
import{disconnectedUser,receiveNewMessage} from "../AC"
export default (store)=>(next)=>(action)=>
{
    let counterReconnect=0;
    const emit=(message)=>
    {
        if (counterReconnect>5) return;
        if(ws.readyState===ws.CONNECCTING)
        {
            setTimeout(()=>{
                emit(message)
            },500)
        }
        ws.send(message)
        counterReconnect=0;
    }
   
    switch (action.type)
    {
        case ADD_NEW_USER:
        console.log("1user")
        emit(JSON.stringify({userName:action.payload.userName, avatar:action.payload.userAvatar}));
        ws.onmessage=(message)=>{
            const messageObj=JSON.parse(message.data)
            switch (messageObj.type)
            {
                case "connected_new_user":
                console.log(messageObj);
                return next({...action, payload:{userName:messageObj.userName,userId:messageObj.userId, userAvatar:messageObj.userAvatar}})
                break;
                case "connected_users":
                return next({...action, type:ADD_CONNECTED_USERS ,payload:{usersArray:messageObj.usersArray}})
                console.log(messageObj);
                break;
                case "disconnected_user":
                console.log(messageObj);
                return next(disconnectedUser (messageObj.userId));
                break;
                case "message":
                console.log(messageObj);
                return next(receiveNewMessage(messageObj.data));
                break;
                
            }
        }
        break;
        case SEND_MESSAGE:
        console.log("1"+action.payload.message)
        emit(action.payload.message)
    }

    
}