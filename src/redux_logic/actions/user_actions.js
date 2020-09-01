import axios from 'axios'
import {store} from '../../index'


import {addWebSocket_PersonalChannel} from './web_sockets_actions'
const root_url = '//localhost:8000'


export function loginUser(data,history){
    return function(dispatch) {
        fetch(root_url + '/api/login/', {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
            }) .then(
                function (response) {
                    if(response.status == 200){
                        return response.json()
                    }
                    if (response.status === 400) {
                        throw new Error('gck')
                    }
              }).then(response =>{
                if(response !== undefined){
                    dispatch(setUserData(response));
                    history.push('profile')
                    dispatch(addWebSocket_PersonalChannel())
                }
        })
    }
}



export function changeAvatar(file){
    return async function(dispatch) {
        console.log('меняю аватар')
        console.log(file)
        
        let token = store.getState().user.token;
        let response = await fetch(root_url + '/api/change_avatar/', {
            method: 'POST',
            body: {}, 
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': 'true',
                // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            }
            })
        console.log(response)
    }
}


export function regUser(data,history){
    return function(dispatch) {
        fetch(root_url + '/api/users/', {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!

            headers: {
                'Content-Type': 'application/json'
            }
            }).then(response =>{
                if(response.status == 201){
                    history.push('login')
                }
        })
    }
}


export function loadUser(history){
    return function(dispatch) {
        return axios.get(root_url + '/api/get_user_data/')
            .then(response =>{
                if(response.data.username === 'AnonymousUser' && window.location.pathname !== '/reg' && window.location.pathname !== '/login'){
                    history.push('/login')
                }
                dispatch(setUserData(response.data));
            })
    }
}

export function searchUser(data,obj){
    let token = store.getState().user.token;
    fetch(root_url + '/api/search_users/', {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
        }).then(
            function (response) {
                if(response.status == 200){
                    return response.json()
                }
        }).then(response =>{
            if(response !== undefined){
                obj.setState({user_list:response})
            }
    })
}




export function setUserData(data){
    return{
        type: 'SET_USER_DATA',
        payload: data
    }
}
