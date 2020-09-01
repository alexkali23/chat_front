import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {store} from '../index'
import {Link} from 'react-router-dom'

import {loadChat,addMessage,changeMessage,deleteMessage,root_url} from '../redux_logic/actions/chat_actions'
import {addWebSocket_Chat,closeWebSocket} from '../redux_logic/actions/web_sockets_actions'
import Messages from '../conteiners/messages'


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '',chatSocket:null,id : props.match.params.id};

        this.change_text = this.change_text.bind(this);
        this.submit = this.submit.bind(this);
        
    }

    change_text(e){
        this.setState({text: e.target.value});
    }
    changeActive(){
        let selector = document.querySelector('.head .burger-button')
        if(!selector.classList.contains('active')){
            selector.classList.add('active')
        }else{
            selector.classList.remove('active')
        }
    }

    submit(e) {
        let webSocket = store.getState().web_sockets['chat_web_socket'];
        webSocket.send(JSON.stringify({
            text:this.state.text,
            method:'ADD_MESSAGE',
        }))
        this.setState({text: ''})
        e.preventDefault();
      }


    componentWillUnmount() {
        this.props.closeWebSocket({name:'chat_web_socket'}) 
    }

    componentDidMount(){
        this.props.loadChat(this.props.match.params.id)
        this.props.addWebSocket_Chat(this.state.id)
    }



    render() {
        if(this.props.chat === null){
            return <div>гружусь</div>
        }else{

            return (
                <div>


                    <div className='head'>
                        <Link to='/profile'><div className = 'to-profile'></div></Link>
                        <div className = 'burger-button' onClick={this.changeActive}>
                            <div className='menu'>
                                <div>
                                    <div className='icon'></div>
                                    block
                                </div>
                                <div>
                                    <div className='icon'></div>
                                    mute
                                </div>
                            </div>
                        </div>
                        <div className='text'>
                            {this.props.chat.name}
                        </div>
                    </div>


                    <Messages chatSocket = {this.state.chatSocket} />


                    <form onSubmit={this.submit} className='form_add_chat'>
                        <div className='block-avatar' style={{ backgroundImage: `url(`+root_url + this.props.user.avatar +`)` }}></div>
                        <textarea value={this.state.text} onChange={this.change_text} />
                        <input type='submit' value='' />
                    </form>


                </div>
            )

            
    }
}
}


function mapStateToProps(state){
    return{chat:state.chat.chat_room,user:state.user}
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({loadChat: loadChat,addWebSocket_Chat:addWebSocket_Chat,closeWebSocket:closeWebSocket},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);