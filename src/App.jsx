import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import index from './index.jsx';
let getLocation = require('./getLocation').getLocation;
let getURL = require('./getURL').getURL;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMessage: function(e) {
                if (e.key === 'Enter') {
                    this.socket.send(JSON.stringify({"type": "postMessage", "username": this.state.myUser.name, "content": `${this.state.myUser.name} says ${e.target.value}.`, "colour": window.colour}));
                }
            }.bind(this),

            changeName: function(e) {
                if (e.key === 'Enter') {
                    this.socket.send(JSON.stringify({"type": "postNotification", "content": `${this.state.myUser.name} has changed their name to ${e.target.value}.`}));
                    this.setState({
                        myUser: {
                            name: e.target.value
                        }
                    });
                }
            }.bind(this),

            myUser: {
                name: "Captain_Planet"
            },
            messages: [],
            notification: '',
            clientCount: 0
        };
        getLocation = getLocation.bind(this);
        getURL = getURL.bind(this);
    }

    componentDidMount() {

        const sockServe = new WebSocket("ws://localhost:4000");
        this.socket = sockServe;
        console.log("componentDidMount <App />");

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {

                case "incomingMessage":
                    console.log(data.content)

                    let url = getURL(data.content);
                    let isImage = false;
                    if (url) {
                        let pathname = getLocation(url).pathname;
                        if (['png', 'jpg', 'gif', 'jpeg'].indexOf(pathname.split('.').pop()) > -1) {
                            isImage = true;
                            data.content = data.content.replace(url, '');
                        }
                    }

                    const newMessage = {
                        username: data.username,
                        content: data.content,
                        colour: data.colour,
                        img: isImage
                            ? url
                            : null
                    };

                    const messages = this.state.messages.concat(newMessage);
                    this.setState({messages: messages});
                    console.log(this.state.messages);
                    break;

                case "incomingNotification":
                    console.log('this is an incoming notification line 80', this);

                    console.log('data.content line 82', data.content);
                    const notification = data.content;
                    this.setState({notification: data.content});
                    break;

                case "clientCount":

                    this.setState({clientCount: data.count});
                    break;

                case "changeColour":
                    window.colour = data.colour;
                    // $("#" + data.).css({"background-color": data.color});
                    break

                default:
                    // show an error in the console if the message type is unknown
                    throw new Error("Unknown event type " + data.type);
            }

        }

    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <a href="/" className="navbar-brand">Chatty</a>
                    <span className="clientCount">
                        Active users: {this.state.clientCount}
                    </span>
                </nav>

                <div className="message system">
                    {this.state.notification}
                </div>
                <main className="messages">
                    <Message messages={this.state.messages}/>
                </main>
                <ChatBar myUser ={this.state.myUser} newMessage ={this.state.newMessage} changeName={this.state.changeName}/>
            </div>
        );
    }
}
export default App;
