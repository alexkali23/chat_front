export default function(state={chat_room:{},messages:[]},action){
    let new_messages;
    switch(action.type){
        case 'SET_CHAT_DATA':
            return action.payload;        
        case 'ADD_MESSAGE':

            new_messages = [...state.messages,action.payload]
            return {...state,messages:new_messages}
        case 'CHANGE_MESSAGE':
            new_messages = state.messages.map(item=>item.id === action.payload.id?action.payload:item)
            return {...state,messages:new_messages}        
        case 'DELETE_MESSAGE':
            new_messages = state.messages.filter(item=>item.id !== action.payload.id)
            return {...state,messages:new_messages}
        default:
            return state
    }
}