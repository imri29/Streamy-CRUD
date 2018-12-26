import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// components
import StreamForm from './StreamForm';

// actions
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends Component {
  componentDidMount() {
    const { fetchStream } = this.props;
    fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues)
  };

  render() {
    const { stream } = this.props;

    if (!stream) {
      return <div>Loading...</div>;
    }

    // initialValues is a redux-form prop
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
