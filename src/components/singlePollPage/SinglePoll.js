import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Poll from './Poll';
import Chart from './Chart';
import NewAnswer from './NewAnswer';

const SinglePoll = (props) => {
  const renderDeleteBtn = () =>
		// if (loggedIn) {
    (<Link
      to="/polls"
      className="waves-effect btn red lighten-2"
      onClick={() => props.deletePoll(props.state.poll.indexInDb, props.url)}
    >
      <i className="material-icons right">report_problem</i>
			DELETE Poll
		</Link>);
	// }
	// return false;

  const editPollBtn = () =>
		// if (loggedIn) {
    (<a className="waves-effect btn teal lighten-2" href="#modal1">
			ADD New Answer
		</a>);
	// }
	// return false;

  const condRender = () => {
    if (props.state.fetched) {
      return (
        <div>
          <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-4 hoverable">
                <Poll
                  poll={props.state.poll}
                  index={props.state.poll.indexInDb}
                  updateVotes={props.updateVotes}
                />
                <div className="card-action" />
              </div>
            </div>

            <div className="col s12 m6">
              <Chart poll={props.state.poll} index={props.state.poll.indexInDb} />
            </div>
          </div>

          <div className="row">
            <div className="col s12 m8">
              <a href="https://twitter.com/share" className="btn blue accent-1">
                <i className="waves-effect material-icons right">trending_up</i>
								Tweet Poll
							</a>
              {editPollBtn()}
              {renderDeleteBtn()}
              <NewAnswer
                poll={props.state.poll}
                index={props.state.poll.indexInDb}
                addEditPoll={props.addEditPoll}
              />
            </div>
            <div className="col s12 m4">
              <Link to="/polls" className="waves-effect btn green lighten-2 right-align">
								Back to all Polls
							</Link>
            </div>
          </div>
        </div>
      );
    }
    return <div>loading</div>;
  };

  return (
    <div className="grey darken-2" style={{ margin: '0px', padding: '0px', height: '100%' }}>
      {condRender()}
      <div className="row grey darken-2" />
    </div>
  );
};

SinglePoll.propTypes = {
  state: PropTypes.shape({
    poll: PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(
				PropTypes.shape({
  answer: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
}),
			),
      indexInDb: PropTypes.number.isRequired,
    }).isRequired,

    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  // deletePoll: PropTypes.func.isRequired,
  // updateVotes: PropTypes.func.isRequired,
  // addEditPoll: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default SinglePoll;