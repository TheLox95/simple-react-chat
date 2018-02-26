import * as React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import User from '../common/User';

interface Props {
  users: User[];
}

export default class UserListComponent extends React.Component<Props> {
  render() {
    return (
      <Segment>
        {this.props.users.map(function(
          user: User,
          index: number
        ) {
          return (
            <div key={index}>
              <Item>
                <Item.Image
                  size="tiny"
                  src={'/avatar/' + user.avatar + '.jpg'}
                />
                <Item.Content>{user.name}</Item.Content>
              </Item>
            </div>
          );
        })}
      </Segment>
    );
  }
}
