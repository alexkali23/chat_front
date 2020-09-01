import {store} from '../../index'
const root_url = 'http://localhost:8000'


export function deleteChat(pk){
    return function(dispatch) {
        let token = store.getState().user.token;
        fetch(root_url + '/api/chat_room/'+pk, {
            method: 'DELETE', // или 'PUT'
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
            }) .then(
                function (response) {
                    console.log(response)
                    if(response.status === 204){
                        dispatch(deleteChatData(pk));
                    }
              })
    }
}


export function loadChats(){
    return function(dispatch) {
        let token = store.getState().user.token;
        fetch(root_url + '/api/list_chats/', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
            }) .then(
                function (response) {
                    if(response.status == 200){
                        return response.json()
                    }
            }).then(response =>{
                if(response !== undefined){
                    dispatch(setChatsData(response));
                }
        })
    }
}

export function changeCountUnreadMessages(data){
    return{
        type: 'CHANGE_COUNT_UNREAD_MESSAGE',
        payload: data
    }
}


export function setChatsData(data){
    return{
        type: 'SET_CHATS_DATA',
        payload: data
    }
}

export function addChat(data){
    return{
        type: 'ADD_CHAT',
        payload: data
    }
}

export function deleteChatData(data){
    return{
        type: 'DELETE_CHAT',
        payload: data
    }
}

export function changeLastMessages(data){
    return{
        type: 'CHANGE_LAST_MESSAGE',
        payload: data
    }
}