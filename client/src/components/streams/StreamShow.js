import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { fetchStream } from '../../actions';

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    const {stream} = this.props;
    if (!stream) return 'Loading...';
    return (
      <div>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
        </div>
    );
  }
}

const mapStatToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStatToProps,
  { fetchStream }
)(StreamShow);
