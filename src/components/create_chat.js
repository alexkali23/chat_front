import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import {searchUser} from '../redux_logic/actions/user_actions';
import {createChatRoom,addUserToChat,root_url} from '../redux_logic/actions/chat_actions'
import {store} from '../index'

class Create_chat extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '',user_list : []};
        this.changeText = this.changeText.bind(this);

    }

    changeText(e){
        this.setState({text: e.target.value});
        if(e.target.value.length>3){
            searchUser({text: e.target.value},this)
        }else{
            this.setState({user_list : []})
        }
    }


    async createChat(username,user_id){
        let name_chat_room = store.getState().user.username+'||'+username
        let result = await createChatRoom({name:name_chat_room})
        let add_user = await addUserToChat({user:user_id,chat_room:result.id})
        this.props.history.push('/chat/'+result.id)
    }
    submit(e) {
        e.preventDefault();
    }


    render() {
        return (
            <div className='search-users'>
                <div className='head'>
                    <Link to='/profile'><div className = 'to-profile'></div></Link>
                    <div className='text'>
                        Поиск пользователей
                    </div>
                </div>
                <form className='form' onSubmit={this.submit} >
                    <input type="text" value={this.state.text} onChange={this.changeText}></input>
                </form>
                
                {this.state.user_list.map((user)=>{return(
                    <div className='block-user' key = {user.id} onClick={()=>this.createChat(user.username,user.id)}>
                        <div className='block-username'>{user.username}</div>
                        <div className='block-avatar' style={{ backgroundImage: `url(`+root_url + user.avatar +`)` }}></div>
                    </div>
                )})}
            </div>
            )
    }
}


export default Create_chat