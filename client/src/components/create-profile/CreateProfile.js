import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import AreaFieldGroup from '../common/AreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

import { createProfile, getProfile } from '../../actions/profile';

class CreateProfile extends Component {
  state = {
    displaySocial: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
    edit: false,
    startedEditing: false,
  };

  componentDidMount() {
    // Set current profile in redux store in case someone refresh the page and lost profile data in redux state
    if (this.props.profile.profile === null) {
      this.props.getProfile();
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Check if url is /edit-profile if so set the already existing profile fields as state fields
    if (
      props.profile.profile &&
      props.history.location.pathname === '/edit-profile' &&
      !state.startedEditing
    ) {
      const { profile } = props.profile;
      const displaySocial = Object.keys(profile.social).length > 0;

      console.log('get derived state from props in create/edit profile');

      return {
        ...state,
        handle: profile.handle,
        company: profile.company ? profile.company : '',
        website: profile.website ? profile.website : '',
        location: profile.location ? profile.location : '',
        status: profile.status ? profile.status : '',
        skills: profile.skills.join(','),
        bio: profile.bio ? profile.bio : '',
        githubusername: profile.githubusername ? profile.githubusername : '',
        twitter: profile.social.twitter ? profile.social.twitter : '',
        facebook: profile.social.facebook ? profile.social.facebook : '',
        instagram: profile.social.instagram ? profile.social.instagram : '',
        linkedin: profile.social.linkedin ? profile.social.linkedin : '',
        youtube: profile.social.youtube ? profile.social.youtube : '',
        edit: true,
        displaySocial: displaySocial,
        startedEditing: true,
      };
    }

    if (props.errors) {
      return {
        ...state,
        errors: props.errors,
      };
    }

    return null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleDisplaySocial = () => {
    this.setState((prevState) => ({ displaySocial: !prevState.displaySocial }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    const options = [
      { label: '* Select Professional Status', value: null },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },
    ];

    let socialInputs;

    if (this.state.displaySocial) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    } else {
      socialInputs = null;
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form action="add-experience" onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Handle"
                  value={this.state.handle}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                  disabled={this.state.edit}
                  onChange={this.onChange}
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  error={errors.website}
                  info="Could be your own website or a company one"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder="Githubusername"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                  onChange={this.onChange}
                />
                <AreaFieldGroup
                  name="bio"
                  placeholder="Bio"
                  value={this.state.bio}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                  onChange={this.onChange}
                />
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={this.toggleDisplaySocial}
                >
                  Add Social Network Links
                </button>
                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
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
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { createProfile, getProfile })(
  withRouter(CreateProfile)
);
