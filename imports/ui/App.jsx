import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../api/messages.js';

import Message from './Message.jsx';

const _ = require('lodash');
// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    };
    this.renderMessages = this.renderMessages.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.saveMessages = this.saveMessages.bind(this);
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages() {
     const handle = this;
     Meteor.call('checkSlack',function(err, response) {
        if(err){
          console.log('error');
        }
        else {
          handle.setState({
            messages: response,
          });
        }
     });
  };

  renderMessages() {
     //const messages = this.state.messages;
     const messages = Messages.find({}).fetch();
     return _.map(messages, (message,index) => (
        <Message key={index} message={message} />
       ));
 }

  saveMessages(){
    // chercher comment inserer un message a la fois
    // cad une boucle pour enregistrer les records
    // RQ: ne change pas la fonction au dessus

    console.log(this.state.messages.count);
    const messages = this.state.messages;
    console.log(messages);
    const msgs = Messages.find({}).fetch();
    console.log(msgs);
    var addedMsgs = _.differenceBy(messages,msgs, 'ts');
    console.log(addedMsgs);

    // for (var i = 0; i < addedMsgs.length; i++) {
    //   Messages.insert(addedMsgs[i]);
    // }
     _.map(addedMsgs, (message) =>
      Messages.insert(message)
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Messages List</h1>
        </header>
        <button onClick={this.saveMessages}>Save</button>
        {this.renderMessages()}
      </div>
    );
  }

}

App.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    messages: Messages.find({}).fetch(),
  };
}, App);
