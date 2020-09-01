import { combineReducers } from 'redux';
import reducer_user from './user_reducer';
import reducer_chats from './chats_reduser';
import reducer_chat from './chat_reduser';
import web_sockets from './web_socket_reducers';

const rootReducer = combineReducers({
    user: reducer_user,
    chats: reducer_chats,
    chat: reducer_chat,
    web_sockets: web_sockets,
});

export default rootReducer;