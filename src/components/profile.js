import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import {root_url} from '../redux_logic/actions/chat_actions'
import {loginUser} from '../redux_logic/actions/user_actions'
import Chats from '../conteiners/chats'
import Change_avatar from './change_avatar_form'

function Profile(props){
        return(
            <div>
                <div className='head'>
                    <div className='text'>
                        Профиль
                    </div>
                </div>
                <div className='block-profile'>
                    <div className='block-avatar' style={{ backgroundImage: `url(`+root_url + props.user.avatar +`)` }}></div>
                    <div className='block-username'>{props.user.username}</div>
                    <div className='change-avatar'><Change_avatar/></div>
                </div>
                <Chats/>
                <Link to='create_chat'><div className='create_chat'></div></Link>
            </div>
        )
}

function mapStateToProps(state){
    return{user:state.user}
}

export default connect(mapStateToProps)(Profile);