import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileItem from './ProfileItem/ProfileItem';
import Spinner from '../common/Spinner';

import { getAllProfiles } from '../../actions/profile';

class Profiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    let displayProfiles;

    if (!this.props.profile.profiles || this.props.profile.loading) {
      displayProfiles = <Spinner />;
    } else {
      displayProfiles = this.props.profile.profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {displayProfiles}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
