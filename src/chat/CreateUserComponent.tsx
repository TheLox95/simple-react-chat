import * as React from 'react';
import { Modal, Dropdown, Input, Button, Icon, InputOnChangeData, Message } from 'semantic-ui-react';

interface State {
    username: string;
    isValid: boolean;
    done: boolean;
}

interface Props {
    onCreatedCallback: (username: string) => void;
    usedUsername: Set<string>;
}

export default class CreateUser extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
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
    
        this.setState({ username: data.value.toString() });
      }

    readonly validateUser = (user: string) => {
        if (user === '') {
            this.setState({isValid: false});
            return;
        } 
        
        if (this.props.usedUsername.has(user) === true) {
            this.setState({isValid: false});            
            return;
        }

        this.setState({ username: user.toString(), done: true });
        this.onValidUsernamSelected();
      }

    onValidUsernamSelected() {
        this.props.onCreatedCallback(this.state.username);
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
              selection={true}
              options={[
                {
                  text: 'Jenny Hess',
                  value: 'Jenny Hess',
                  image: {
                    avatar: true,
                    src: '/avatar/1.jpg'
                  }
                }
              ]}
            />
          </Modal.Description>
            <Message negative={true} hidden={this.state.isValid}>
                <Message.Header>This username is already used or is invalid.</Message.Header>
                <p>Please use other.</p>
            </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            name="checkmark"
            disabled={this.state.username === ''}
            onClick={() => this.validateUser(this.state.username)}
          >
            <Icon name="checkmark" />
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
