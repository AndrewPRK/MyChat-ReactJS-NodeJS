import {RECEIVE_NEW_MESSAGE} from "../constants"

const defaultMessagesState = [];

export default function messagesReduser(messagesState = defaultMessagesState, action)
{
    switch(action.type)
    {
        case RECEIVE_NEW_MESSAGE:
            return messagesState.concat(action.payload.message);
    }
    return messagesState;
}
