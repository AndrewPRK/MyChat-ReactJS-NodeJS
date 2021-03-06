import {ADD_NEW_USER,SEND_MESSAGE,ADD_CONNECTED_USERS} from "../constants"
import ws from "../Util/ws"
import{disconnectedUser,receiveNewMessage} from "../AC"

export default (store)=>(next)=>(action)=>{
    let counterReconnect=0;
    const emit=(message)=>
    {
        if (counterReconnect > 5) return;
        if(ws.readyState===ws.CONNECCTING)
        {
            setTimeout(()=>{emit(message)}, 500)
        }
        ws.send(message);
        counterReconnect = 0;
    }
   
    switch (action.type)
    {
        case ADD_NEW_USER:
        emit(JSON.stringify({userName:action.payload.userName, avatar:action.payload.userAvatar}));
        ws.onmessage = (message)=>{
            const messageObj = JSON.parse(message.data);
            switch (messageObj.type)
            {
                case "connected_new_user":
                    return next({...action, payload:{userName:messageObj.userName,userId:messageObj.userId, userAvatar:messageObj.userAvatar}})
                break;
                case "connected_users":
                    return next({...action, type:ADD_CONNECTED_USERS ,payload:{usersArray:messageObj.usersArray}})
                break;
                case "disconnected_user":
                    return next(disconnectedUser (messageObj.userId));
                break;
                case "message":
                    return next(receiveNewMessage(messageObj.data));
                break;
            }
        }
        break;
        case SEND_MESSAGE:
            emit(action.payload.message);
    }

    
}