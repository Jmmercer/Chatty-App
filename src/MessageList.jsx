import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        return (
            <div>
                {this.props.messages.map(message => <div key={this.props.messages.indexOf(message) + '-div'}>
                    <span className="message-username" style={{
                        'color': message.colour
                    }} key={this.props.messages.indexOf(message) + 'uname'}>
                        {message.username}
                    </span>
                    <span className="message-content" key={this.props.messages.indexOf(message) + 'content'}>
                        {message.content}
                        {message.img && <img src={message.img} style={{
                            'maxWidth': '60%'
                        }}/>}
                    </span>
                </div>)}
            </div>
        );
    }
}

export default MessageList;
