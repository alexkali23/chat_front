export default function(state=null,action){
    let results;
    switch(action.type){
        case 'SET_CHATS_DATA':
            return action.payload;
        case 'DELETE_CHAT':
            results = state.results.filter(element=> element.id !== action.payload)
            return {...state,results:results}
        case 'ADD_CHAT':
            results = [...state['results'],action.payload]
            return {...state,results:results}
        case 'CHANGE_LAST_MESSAGE':
            results = state.results.map(item=> item.id === action.payload.chat_room ? {...item,last_message : action.payload} : item )
            return {...state,results:results}
        case 'CHANGE_COUNT_UNREAD_MESSAGE':
            results = state.results.map(item=> item.id === action.payload.id ? {...item,count_unread_messages : action.payload.value} : item )

            return {...state,results:results}
        default:
            return state
    }
}