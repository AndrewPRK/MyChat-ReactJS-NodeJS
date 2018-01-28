import {ADD_NEW_USER, DISCONNECTED_USER, RECEIVE_NEW_MESSAGE, SEND_MESSAGE} from "../constants"

export function addNewUser(userName,userAvatar){
    return {
        type:ADD_NEW_USER,
        payload:{
            userName,
            userAvatar
        }
    }
}

export function disconnectedUser(userId){
    return {
        type:DISCONNECTED_USER,
        payload:{
            userId
        }
    }
}

export function receiveNewMessage(message){
    return {
        type:RECEIVE_NEW_MESSAGE,
        payload:{
            message
        }
    }
}
export function sendMessage(message)
{
    return(
        {
            type:SEND_MESSAGE,
            payload:{
                message
            }
        }
    );
}


