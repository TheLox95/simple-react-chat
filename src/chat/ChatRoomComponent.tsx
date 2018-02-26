import * as React from 'react';
import {
  Segment,
  TextArea,
  Form,
  Button,
  Grid,
  Comment,
  TextAreaProps,
  Modal,
  Header,
  Input,
  Icon,
  InputOnChangeData
} from 'semantic-ui-react';
import Chat from './Chat';
import * as ReactDOM from 'react-dom';
interface State {
  text: string;
  comments: string[];
  username: string;
  users: Set<string>;
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
      username: ``,
      users: new Set(),
      joined: false
    };

    const chat = new Chat();
    chat.onMessage(this.onMessageCallback);
    chat.onUser(this.onUserCallback);
    chat.onDisconnect(this.onUserDisconnected);

    window.addEventListener('beforeunload', (ev) => {  
        chat.disconnect(this.state.username.toString());        
    });
  }

  readonly onUserDisconnected = (user: string) => {
    this.state.users.delete(user);
    this.forceUpdate();
  }

  readonly onMessageCallback = (msg: string) => {
    this.setState({ comments: this.state.comments.concat(msg) });
  }

  readonly onUserCallback = (user: string) => {
    this.setState({ users: this.state.users.add(user), joined: true });
  }

  componentDidMount() {
    this._chatRoom = new Chat();
  }

  readonly handleUsername = (
    e: React.SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    if (data.value === undefined) {
      return;
    }

    this.setState({ username: data.value.toString() });
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
    this._chatRoom.sendMessage(this.state.text);
    this.setState({ text: '' });
  }

  readonly join = (user: string) => {
    if (this.state.users.has(user) === true) {
      return;
    }
    this._chatRoom.addUser(user);
  }

  render() {
    return (
      <div id="chatroom">
        <Segment textAlign="left">
          <Grid>
            <Grid.Column width={11}>
              {this.state.comments.map(function(msg: string, index: number) {
                return (
                  <p key={index}>{msg}</p>
                );
              })}
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
                {Array.from(this.state.users).map(function(
                  user: string,
                  index: number
                ) {
                  return <p key={index}>{user}</p>;
                })}
              </Segment>
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
          <Modal
            open={this.state.joined === false}
            closeOnEscape={false}
            closeOnRootNodeClick={false}
          >
            <Modal.Header>Write your username</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Input
                  placeholder="Username..."
                  onChange={this.handleUsername}
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                name="checkmark"
                disabled={this.state.username === ''}
                onClick={() => this.join(this.state.username)}
              >
                <Icon name="checkmark"/>
                OK
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </div>
    );
  }
}
