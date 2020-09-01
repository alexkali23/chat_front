import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import React from 'react';
import {Link} from 'react-router-dom'
import {loadChats} from '../redux_logic/actions/list_chat_actions'
import {root_url} from '../redux_logic/actions/chat_actions'

function Messages(props){
    return (
        <div>
            {props.messages.map((message)=>{return(
                <div key = {message.id} className='message-block'>
                    <Message message = {message} username = {props.username} chatSocket = {props.chatSocket}/>
                </div>
            )})}
         </div>
        );
}




class Message extends React.Component { // разделить на 2 класса
    constructor(props) {
      super(props);
      this.state = {
        status : true ,
        text : props.message.text
      };

      this.changeStatus = this.changeStatus.bind(this);
      this.submit = this.submit.bind(this);
      this.deleteMessage = this.deleteMessage.bind(this);
    }

    changeStatus() {
        this.setState({status : !this.state.status })
    }

    submit(e) {
        this.props.chatSocket.send(JSON.stringify({
            text:this.state.text,
            method:'REDACT_MESSAGE',
            pk:this.props.message.id,
        }))
        this.setState({status : !this.state.status })
        e.preventDefault();
      }

    deleteMessage(){
        this.props.chatSocket.send(JSON.stringify({
            method:'DELETE_MESSAGE',
            pk:this.props.message.id,
        }))
    }


    render() {
    if(this.props.message.username != this.props.username){
      return (
        <>
            <div className='block-avatar' style={{ backgroundImage: `url(`+root_url + this.props.message.avatar +`)` }} ></div>
            <div className='avatar-block'></div>
            <div className='username-block'>{this.props.message.username}</div>
            <div className='text-block'>{this.props.message.text}</div>
        </>
      )
    }else{
        return (
            <>
                <div className='block-avatar' style={{ backgroundImage: `url(`+root_url + this.props.message.avatar +`)` }}></div>
                <div className='username-block'>{this.props.message.username}</div>
                <div className='delete-message' onClick={this.deleteMessage}></div>
                <div className='redact-message' onClick={this.changeStatus}></div>
                {this.state.status == true
                    ? (
                        <>
                            <div className='text-block'>{this.props.message.text}</div>
                        </>
                    ):(
                        <>
                            <form onSubmit={this.submit} className='form-redact'>
                                <textarea value={this.state.text} onChange={(e)=>this.setState({text: e.target.value})} />
                                <input type="submit" value=""></input>
                            </form>
                        </>
                    )
                }
            </>
        )
        }    
    }
  }





function mapStateToProps(state){
    return{messages:state.chat.messages,username:state.user.username,chatSocket:state.web_sockets['chat_web_socket']}
}



export default connect(mapStateToProps)(Messages);