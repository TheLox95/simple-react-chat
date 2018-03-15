import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import ChatroomComponent from './chat/ChatRoomComponent';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my Chat App</h1>
        </header>
        <p className="App-intro">
          If you are alone you can open another tab and chat with yourself ;)
        </p>
        <ChatroomComponent />
      </div>
    );
  }
}

export default App;
