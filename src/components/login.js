import React,{ Component,useState } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {loginUser} from '../redux_logic/actions/user_actions'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {login: 'user1',password:'user'};

        this.change_login = this.change_login.bind(this);
        this.change_password = this.change_password.bind(this);
        this.submit = this.submit.bind(this);
    }

    change_login(e){
        this.setState({login: e.target.value});
    }

    change_password(e){
        this.setState({password: e.target.value});
    }

    submit(e) {
        this.props.loginUser({
            "username": this.state.login,
            "password": this.state.password
        },this.props.history)
        e.preventDefault();
      }

    render() {
        return (
            <div>
                <div className='head'>
                    <div className='text'>
                        Авторизация
                    </div>
                </div>
                <form onSubmit={this.submit} className='form'>
                        <input type="text" value={this.state.login} onChange={this.change_login} />
                        <input type="text" value={this.state.password} onChange={this.change_password} />
                    <input type="submit" value="login" />
                </form>
            </div>
        )
    }
}





function mapDispatchToProps(dispatch){
    return bindActionCreators({loginUser: loginUser},dispatch)
}

  export default connect(null,mapDispatchToProps)(Login);