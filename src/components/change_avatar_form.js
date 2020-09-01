import React from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {changeAvatar} from '../redux_logic/actions/user_actions';

class Change_avatar extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { picture: null };
         this.onDrop = this.onDrop.bind(this);
         this.submit = this.submit.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            picture: picture
        });
    }
 
    submit(e) {
        if(this.state.picture !== null){
            this.props.changeAvatar(this.state.picture)
        }
        e.preventDefault();
      }

    render() {
        return (
            <form onSubmit={this.submit}>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    singleImage = {true}
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.png','.jpeg']}
                    maxFileSize={5242880}
                />
            <input type="submit" value="изменить" />
            </form>
        );
    }
}



function mapDispatchToProps(dispatch){
    return bindActionCreators({changeAvatar: changeAvatar},dispatch)
}

  export default connect(null,mapDispatchToProps)(Change_avatar);