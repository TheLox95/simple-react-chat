import * as React from 'react';
import { Modal, Dropdown, Input, Button, Icon, InputOnChangeData, Message } from 'semantic-ui-react';
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import User from '../common/User';

interface State {
    user: User;
    isValid: boolean;
    done: boolean;
}

interface Props {
    onCreatedCallback: (user: User) => void;
    usedUsername: Map<string, User>;
}

export default class CreateUser extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            user: new User(),
            isValid: true,
            done: false
        };
    }

    readonly handleUsername = (
        e: React.SyntheticEvent<HTMLInputElement>,
        data: InputOnChangeData
      ) => {
        if (data.value === undefined) {
          return;
        }

        const user = new User(data.value.toString(), this.state.user.avatar);
    
        this.setState((state, props) => {
            return {user};
        });
      }

    readonly choseAvatar = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        const option = data.value;
        if (typeof option === 'string') {
            const user = new User(this.state.user.name, option);            
            this.setState({user});
        }
    }

    readonly validateUser = (user: string) => {
        const userObj = new User();

        if (user === '') {
            this.setState({isValid: false});
            return;
        } 
        
        if (this.props.usedUsername.has(user) === true) {
            this.setState({isValid: false});            
            return;
        }

        if (this.state.user.avatar === '') {
            this.setState({isValid: false});            
            return;
        }

        userObj.name = user.toString();
        userObj.avatar = this.state.user.avatar;

        this.setState({ user: userObj, done: true });
        this.onValidUsernamSelected();
      }

    onValidUsernamSelected() {
        this.props.onCreatedCallback(this.state.user);
    }

  render() {
    return (
      <Modal
        open={this.state.done === false}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
      >
        <Modal.Header>Write your username</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Input placeholder="Username..." onChange={this.handleUsername} />
            <Dropdown
              placeholder="Select Friend"
              onChange={this.choseAvatar}
              selection={true}
              options={[
                {
                  text: 'One',
                  value: '1',
                  image: {
                    avatar: true,
                    src: '/avatar/1.jpg'
                  }
                },
                {
                    text: 'Two',
                    value: '2',
                    image: {
                      avatar: true,
                      src: '/avatar/2.jpg'
                    }
                  },
                  {
                    text: 'Three',
                    value: '3',
                    image: {
                      avatar: true,
                      src: '/avatar/3.jpg'
                    }
                  },
                  {
                    text: 'Four',
                    value: '4',
                    image: {
                      avatar: true,
                      src: '/avatar/4.jpg'
                    }
                  }
              ]}
            />
          </Modal.Description>
            <Message negative={true} hidden={this.state.isValid}>
                <Message.Header>This username is already used or is invalid.</Message.Header>
                <p>Please use other and remeber to chose and avatar.</p>
            </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            name="checkmark"
            disabled={this.state.user.name === ''}
            onClick={() => this.validateUser(this.state.user.name)}
          >
            <Icon name="checkmark" />
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
