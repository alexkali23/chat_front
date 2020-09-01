import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";


import {loadUser} from '../redux_logic/actions/user_actions';
import Login from './login'
import Profile from './profile'
import Chat from './chat'
import Registration from './registration';
import Create_chat from './create_chat';


function App(props){
            let history = useHistory();
            if(props.user == null){
                props.loadUser(history)
                return (
                    <div>
                        гружусь
                    </div>
                );
            }else{
                return (
                    <div className='block-content'>
                        <Route path= '/login' component={Login} history={history} />
                        <Route path= '/reg' component={Registration} history={history}/>
                        <Route path= '/profile' component={Profile} />
                        <Route path= '/chat/:id' component={Chat} />
                        <Route path= '/create_chat' component={Create_chat} />
                    </div>
                );
            }
}

function mapStateToProps(state){
    return{user:state.user}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadUser: loadUser},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);