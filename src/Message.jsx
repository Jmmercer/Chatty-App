import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="message system">
                    <MessageList messages={this.props.messages}/>
                </div>
            </div>
        );
    }
}

export default Message;
