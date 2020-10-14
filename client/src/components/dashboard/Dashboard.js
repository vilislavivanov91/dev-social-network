import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile, deleteProfile } from '../../actions/profile';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import EducationTable from './EducationTable/EducationTable';
import ExperienceTable from './ExperienceTable/ExperienceTable';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  deleteProfile = () => {
    this.props.deleteProfile();
  };

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if profile is empty or not
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {profile.education.length > 0 ? (
              <EducationTable educations={profile.education} />
            ) : null}
            {profile.experience.length > 0 ? (
              <ExperienceTable experiences={profile.experience} />
            ) : null}
            <div style={{ marginBottom: '60px' }} />
            <button className="btn btn-danger" onClick={this.deleteProfile}>
              Delete profile
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h1>No profile</h1>
            <Link to="/create-profile">Create Profile</Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getProfile, deleteProfile })(
  Dashboard
);
