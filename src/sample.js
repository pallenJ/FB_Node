'use strict';
const e = React.createElement;
//const log = require('firebase-functions').logger;//require('log4js').getLogger();

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.getElementById('sample_container');
//log.debug(domContainer);
console.debug('aaa');
//ReactDOM.render(e(LikeButton), domContainer);
ReactDOM.render(e(LikeButton),domContainer)