import {store} from '../../index'
import {addMessage,changeMessage,deleteMessage} from './chat_actions'
import {changeLastMessages,addChat} from './list_chat_actions'
import {ToastsStore} from 'react-toasts';
import {changeCountUnreadMessages} from './list_chat_actions';


export function addWebSocket_Chat(id){
    return async function(dispatch) {
        let token = store.getState().user.token;
        let web_socket = await new WebSocket('ws://' + '127.0.0.1:8000'+'/ws/chat/'+ id + "/?token=" + token)
        web_socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            console.log(data)
            if(data.method == 'ADD_MESSAGE'){
                dispatch(addMessage(data.data));
            }else if(data.method == 'REDACT_MESSAGE'){
                dispatch(changeMessage(data.data));
            }else if(data.method == 'DELETE_MESSAGE'){
                dispatch(deleteMessage(data.data));
            }
          };

        dispatch(addWebSocket({name:'chat_web_socket',web_socket:web_socket}));
    }}



export function addWebSocket_PersonalChannel(){
    return async function(dispatch) {
        let token = store.getState().user.token;
        let web_socket = await new WebSocket('ws://' + '127.0.0.1:8000'+'/ws/personal_channel'+"/?token=" + token)
        web_socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            console.log(data)

            if(data.method == 'NEW_MESSAGE' && (store.getState().chat.chat_room.id != data.data.chat_room)){
                dispatch(changeLastMessages(data.data));
                dispatch(changeCountUnreadMessages({
                    id: data.data.chat_room,
                    value: data.count_unread_message
                }));
                if(data.data.username !==store.getState().user.username){

                    ToastsStore.success(data.data.username+': '+data.data.text)
                }
            }
            if(data.method == 'NEW_CHAT'){
                ToastsStore.success('Вы добавлены в чат: '+data.data.name)
                dispatch(addChat(data.data));
            }
        };
    
        dispatch(addWebSocket({name:'personal_web_socket',web_socket:web_socket}));
    }}



export function addWebSocket(data){
    return{
        type: 'ADD_WEB_SOCKET',
        payload: data
    }
}

export function closeWebSocket(data){
    return{
        type: 'DELETE_WEB_SOCKET',
        payload: data
    }
}
