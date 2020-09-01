import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import React from 'react';
import {Link} from 'react-router-dom'
import {loadChats,deleteChat} from '../redux_logic/actions/list_chat_actions'
import {root_url} from '../redux_logic/actions/chat_actions'

function Chats(props){
    if(props.chats == null){
        props.loadChats()
        return (
            <div>
                гружусь
            </div>
        );
    }else{
        return (
            <div>
                <div className='head'>
                    <div className='text'>
                        Чаты
                    </div>
                </div>

                {props.chats.results.map((chat)=>{return(
                    <div className='chat_view_block' key = {chat.id}>
                        <div className='chat_name'>{chat.name}</div>
                        {chat.last_message != null 
                        ? (
                            <div className='block-last-message'>
                                <div className='block-username'>{chat.last_message.username}</div>
                                <div className='block-text'>{chat.last_message.text}</div>
                                <div className='block-avatar' style={{ backgroundImage: `url(`+root_url + chat.last_message.avatar +`)` }}></div>
                                <div className='block-count'>{chat.count_unread_messages}</div>
                            </div>
                        ):(
                            <></>
                        )}

                        <Link to={'/chat/'+chat.id}><div className='area-click'></div></Link>
                        
                        <div className='delete_chat' onClick={()=>props.deleteChat(chat.id)}></div>
                    </div>
                )})}
            </div>
        );
    }
}


function mapStateToProps(state){
    return{chats: state.chats}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadChats: loadChats,deleteChat:deleteChat},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Chats);