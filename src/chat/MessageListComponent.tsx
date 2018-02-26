import * as React from 'react';
import Message from '../common/Message';
import { List, Image } from 'semantic-ui-react';

interface Props {
  messages: Message[];
}

export default class MessageListComponent extends React.Component<Props> {
  render() {
    return (
      <List divided={true} verticalAlign="middle">
        {this.props.messages.map(function(msg: Message, index: number) {
          return (
            <List.Item key={index}>
              <Image
                avatar={true}
                src={'/avatar/' + msg.user.avatar + '.jpg'}
              />
              <List.Content>
                <List.Header as="a">{msg.user.name}</List.Header>
                {msg.body}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }
}
