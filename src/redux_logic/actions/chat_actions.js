
import {store} from '../../index'
import {changeCountUnreadMessages} from './list_chat_actions'

export const root_url = 'http://localhost:8000'


export function loadChat(id){
    return function(dispatch) {
        let token = store.getState().user.token;
        fetch(root_url + '/api/chat_room/' + id, {
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
                    dispatch(setChatData(response));
                    dispatch(changeCountUnreadMessages({
                                                            id: response.chat_room.id,
                                                            value: 0
                                                        }));
                }
        })
    }
}








export async function addUserToChat(data){
    let token = store.getState().user.token;
    let response = await fetch(root_url + '/api/add_user_to_chat_room/', {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
        })
    if (response.ok) {
        return await response.json()
    }        
}



export async function createChatRoom(data){
    let token = store.getState().user.token;
    let response = await fetch(root_url + '/api/add_chat_room/', {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
        })
    if (response.ok) {
        return await response.json()
    }        
}








export function addMessage(data){
    console.log(store.getState())
    return{
        type: 'ADD_MESSAGE',
        payload: data
    }
}

export function changeMessage(data){
    return{
        type: 'CHANGE_MESSAGE',
        payload: data
    }
}

export function deleteMessage(data){
    return{
        type: 'DELETE_MESSAGE',
        payload: data
    }
}

export function setChatData(data){
    return{
        type: 'SET_CHAT_DATA',
        payload: data
    }
}




