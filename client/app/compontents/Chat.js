var React = require('react');


const MessageBubble = (props) => {
    return (
        <div className="message">
            <div className="avatar">{props.name}: </div>
            <div className="text"> {props.text ? props.text : props.children}</div>
        </div>
    );
};

const Messages = (props) => {
    var messages = props.messages.map((message, index) =>
        <MessageBubble key={index + "message"}
                       name={message.name}
                       text={message.text} />
    );
      return (<div> {messages} </div>);
};


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          socket: this.props.socket,
          messages: [],
          text: '',
          users: this.props.users,
          showAll: false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.showAll = this.showAll.bind(this);
    }

    // Gets users from parent
    componentWillReceiveProps(newProps) {
        this.setState({users: newProps.users});
    }

    componentDidMount() {
        const {socket} = this.state;
        socket.on('update messages', (messages) => {
            this.setState({messages: messages});
        });
        socket.emit('update messages');
    }

    sendMessage() {
        this.state.socket.emit('send message', this.state.text);
        this.setState({text: ''});
    }

    showAll() {
        this.setState({showAll: !this.state.showAll});
    }

    // Updates text state and checks if typing
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
        (event.target.value.length < 1 && this.state.socket.emit('stop typing'));

        if (event.target.value.length > 0 && event.target.value.length < 2) {
            this.state.socket.emit('start typing');
        }
    }

    render() {
        const {text, users, showAll, messages, user} = this.state;

        var typingUsers = users
        .filter(user => user.typing == true)
        .map((user, index) =>
            <MessageBubble key={index + "typing"} name={user.name}>
                <span className="one">.</span><span className="two">.</span><span className="three">.</span>​
            </MessageBubble>
        );

        const len = messages.length;
        const amount = len >= 5 ? 5 : len;
        console.log(amount);
        const slicedMessages = !showAll ? messages.slice(len - amount, len) : messages;
        return (
            <div>
                <h1>Chat, hello world!</h1>
                <button onClick={this.showAll}>{!showAll ? "Visa alla meddelanden" : "Visa mindre"}</button>
                <Messages user={user} messages={slicedMessages} />
                {typingUsers}
                    <textarea
                        name={"text"}
                        value={text}
                        onChange={this.handleInputChange}
                        placeholder={"Type your message here"}
                        style={{width:"100%"}}
                    />
                    <button onClick={this.sendMessage}>Send message</button>
            </div>
        );
    }
}

module.exports = Chat;
