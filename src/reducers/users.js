import {ADD_NEW_USER, DISCONNECTED_USER,ADD_CONNECTED_USERS} from "../constants"
 const users=[

] 

export default function userReducer(state=users,action)
{
    switch (action.type){
        case ADD_NEW_USER:
        return state.concat({userName:action.payload.userName,
        userId:action.payload.userId,
        userAvatar:action.payload.userAvatar
    });
    break;
    case DISCONNECTED_USER:
    return state.filter(u=>
        {return u.userId!=action.payload.userId});
    break;
    case ADD_CONNECTED_USERS:
        return state.concat(action.payload.usersArray);
    }
    
    return state;
} 