import React,{ Component,useState } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {regUser} from '../redux_logic/actions/user_actions'

function Registration(props) {

        const submit = (e) => {
            e.preventDefault();
            props.regUser({
                "username": login,
                "email": email,
                "password": password1
            },props.history)
        }

        const [login, setLogin] = useState('');
        const [email, setEmail] = useState('');
        const [password1, setPassword1] = useState('');
        const [password2, setPassword2] = useState('');
        return (
            <div>
                <form onSubmit={submit} className='form'>
                        <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)}  />
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                        <input type="text" value={password1} onChange={(e)=>setPassword1(e.target.value)}  />
                        <input type="text" value={password2} onChange={(e)=>setPassword2(e.target.value)}  />
                    <input type="submit" value="Зарегестрироваться" />
                </form>
            </div>
        )

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({regUser: regUser},dispatch)
}

  export default connect(null,mapDispatchToProps)(Registration);