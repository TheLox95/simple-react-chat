import * as React from 'react';
import {
  Segment,
  TextArea,
  Form,
  Button,
  Grid,
  TextAreaProps
} from 'semantic-ui-react';
import Chat from './Chat';
import Message from '../common/Message';
import CreateUserComponent from './CreateUserComponent';
import User from '../common/User';
import MessageListComponent from './MessageListComponent';
import UserListComponent from './UserListComponent';
interface State {
  text: string;
  comments: Message[];
  user: User;
  users: Map<string, User>;
  joined: boolean;
}

export default class Chatroom extends React.Component<{}, State> {
  private _chatRoom: Chat;
  private _textArea: TextArea | null;
  private _msg: string | number;

  constructor(props: {}) {
    super(props);

    this.state = {
      text: ``,
      comments: [],
      user: new User(),
      users: new Map(),
      joined: false
    };

    this._chatRoom = new Chat();    

    this._chatRoom.onMessage(this.onMessageCallback);
    this._chatRoom.onUser(this.onUserCallback);
    this._chatRoom.onDisconnect(this.onUserDisconnected);

    window.addEventListener('beforeunload', ev => {
      this._chatRoom.disconnect(this.state.user.name.toString());
    });
  }

  readonly onUserDisconnected = (user: User) => {
    this.state.users.delete(user.name);
    this.forceUpdate();
  }

  readonly onMessageCallback = (msg: Message) => {
    this.state.comments.push(msg);
    this.forceUpdate();
  }

  readonly onUserCallback = (user: User) => {
    this.setState({ users: this.state.users.set(user.name, user), joined: true });
  }

  readonly handleType = (
    e: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => {
    if (data.value === undefined) {
      return;
    }

    this.setState({ text: data.value.toString() });
  }

  readonly sendMessage = () => {
    this._chatRoom.sendMessage(
      new Message(this.state.text, this.state.user)
    );
    this.setState({ text: '' });
  }

  readonly join = (user: User) => {
    if (this.state.users.has(user.name) === true) {
      return;
    }
    this.setState({user});
    this._chatRoom.addUser(user);
  }

  render() {
    return (
      <div id="chatroom">
        <Segment textAlign="left" id="chatBox">
          <Grid>
            <Grid.Column width={11}>
              <MessageListComponent messages={this.state.comments}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <UserListComponent users={Array.from(this.state.users.values())}/>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Form>
            <Grid>
              <Grid.Column width={14}>
                <TextArea
                  value={this.state.text}
                  autoHeight={true}
                  placeholder="Write message"
                  onInput={this.handleType}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Button
                  content="Send"
                  onClick={this.sendMessage}
                  color="green"
                  disabled={this.state.text.length === 0}
                />
              </Grid.Column>
            </Grid>
          </Form>
          <CreateUserComponent usedUsername={this.state.users} onCreatedCallback={this.join} />
        </Segment>
      </div>
    );
  }
}
