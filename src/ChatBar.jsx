import React, {Component} from 'react';

class ChatBar extends Component {
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username"
                placeholder="username"
                 defaultValue={this.props.myUser.name} onKeyPress={this.props.changeName}/>
                <input className="chatbar-message" placeholder="Message" onKeyPress={this.props.newMessage}/>
            </footer>
        );
    }
}

export default ChatBar;
