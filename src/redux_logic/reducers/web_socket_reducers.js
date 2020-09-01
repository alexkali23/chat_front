export default function(state=[],action){
    console.log(action)
    switch(action.type){
        case 'ADD_WEB_SOCKET':
            state[action.payload.name] = action.payload.web_socket
            return {...state};
        case 'DELETE_WEB_SOCKET':
            state[action.payload.name].close()
            delete state[action.payload.name]
            return {...state}
        default:
            return state
    }
}