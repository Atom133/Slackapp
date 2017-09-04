import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import '../imports/api/messages.js';

Meteor.startup(() => {
  Meteor.methods({
    checkSlack() {
      this.unblock();
      try {
        var result = HTTP.call('GET','https://slack.com/api/im.history', {
          params: {
            token: 'xoxp-3529758450-225746858497-230582555571-1b60bae8a246404796842636c3839ebe',
            channel: 'D6NC53CS1'
          }
        });
        //console.log(result.data.messages);
        return result.data.messages;
      } catch (error) {
        // Got a network error, timeout, or HTTP error in the 400 or 500 range.
        return error.message;
      }
    }
  });
});
