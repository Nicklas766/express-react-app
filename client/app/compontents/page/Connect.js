var React = require('react');
import io from 'socket.io-client';
import Chat from '../Chat'

const Users = (props) => {
    var onlineUsers = props.users.map(user => <li key={user.id}>{user.name}</li>);
    return (
        <ul style={{width:"15%"}}>
            <h2>online</h2>
            {onlineUsers}
        </ul>
    );
};

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          socket: io(),
          chat: false,
          name: "",
          users: [] // {id: socket.id, name: 'name', typing: false}
      };

      // Bind "this"
      this.handleInputChange = this.handleInputChange.bind(this);
      this.joinChat          = this.joinChat.bind(this);
    }

    componentDidMount() {
        this.state.socket.on('get users', (users) => {
            this.setState({users: users});
        });
    }

    componentWillUnmount() {
        this.state.socket.close();
    }

    joinChat() {
      if (this.state.users.map(user => user.name).includes(this.state.name) || this.state.name == "") {
          return false;
      }
      this.setState({chat: true});
      this.state.socket.emit('new user', this.state.name);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div style={{width: "100%", margin: "auto", display: "flex"}}>

                <Users users={this.state.users}/>

                <div className="reportText">
                    {!this.state.chat &&
                    <div>
                        <h2> Hello! Create a name and join the chat. </h2>
                        <input name={"name"}
                               type="text"
                               value={this.state.name}
                               placeholder={"Your name"}
                               onChange={this.handleInputChange}
                               style={{width:"100%"}}/>
                        <button onClick={this.joinChat}>Join chat</button>
                    </div>}

                    {this.state.chat &&
                        <div>
                            <Chat users={this.state.users}
                                  user={this.state.name}
                                  socket={this.state.socket}/>
                        </div>}
                </div>
            </div>
        );
    }
}

module.exports = Connect;


// När man mountar så ska man  kunna se alla aktiva användare, sedan spärrar om namnet finns
