import React from 'react';
import { connect } from 'react-redux';

// actions
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  // set up auth parameters and check auth status
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '57161318455-0vi3o3jppsgrs9st03dhtrs1j9l3v1le.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    const { signIn, signOut } = this.props;
    isSignedIn ? signIn(this.auth.currentUser.get().getId()) : signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={() => this.auth.signOut()}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={() => this.auth.signIn()}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
