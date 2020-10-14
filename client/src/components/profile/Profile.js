import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileAbout from './ProfileAbout/ProfileAbout';
import ProfileCreds from './ProfileCreds/ProfileCreds';
import ProfileGithub from './ProfileGithub/ProfileGithub';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profile';

class Profile extends Component {
  componentDidMount() {
    if (!this.props.match.params.handle) {
      this.props.history.push('/');
    }

    const handle = this.props.match.params.handle;
    this.props.getProfileByHandle(handle);
  }

  render() {
    const { loading, profile } = this.props.profile;
    let displayProfile;

    if (!profile || loading) {
      displayProfile = <Spinner />;
    } else {
      displayProfile = (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds profile={profile} />
          <ProfileGithub profile={profile} />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link
                    to="/profiles"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-6"></div>
              </div>
              {displayProfile}
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

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
