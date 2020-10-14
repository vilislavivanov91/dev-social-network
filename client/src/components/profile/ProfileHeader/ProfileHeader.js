import React from 'react';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ profile }) => {
  console.log(profile);
  const dispalyCompany = profile.company ? ` at ${profile.company}` : null;
  const dispalyLocation = profile.location ? profile.location : null;
  let displayWebsite;
  let displayFacebook;
  let displayTwitter;
  let displayLinkedin;
  let displayInstagram;
  let displayYoutube;

  if (profile.website) {
    displayWebsite = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={profile.website}
      >
        <i className="fas fa-globe fa-2x"></i>
      </a>
    );
  } else {
    displayWebsite = null;
  }

  if (profile.social.facebook) {
    displayFacebook = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={profile.social.facebook}
      >
        <i className="fab fa-facebook fa-2x"></i>
      </a>
    );
  } else {
    displayFacebook = null;
  }

  if (profile.social.twitter) {
    displayTwitter = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={profile.social.twitter}
      >
        <i className="fab fa-twitter fa-2x"></i>
      </a>
    );
  } else {
    displayTwitter = null;
  }

  if (profile.social.linkedin) {
    displayLinkedin = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={profile.social.linkedin}
      >
        <i className="fab fa-linkedin fa-2x"></i>
      </a>
    );
  } else {
    displayLinkedin = null;
  }

  if (profile.social.instagram) {
    displayInstagram = (
      <a
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        href={profile.social.instagram}
      >
        <i className="fab fa-instagram fa-2x"></i>
      </a>
    );
  } else {
    displayInstagram = null;
  }

  if (profile.social.youtube) {
    displayYoutube = (
      <Link
        className="text-white p-2"
        target="_blank"
        rel="noopener noreferrer"
        to={profile.social.youtube}
      >
        <i className="fab fa-youtube fa-2x"></i>
      </Link>
    );
  } else {
    displayYoutube = null;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              {/* TODO:add avatar to every profile and change it from static img display to dinamic */}
              <img
                className="rounded-circle"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}
              {dispalyCompany}
            </p>
            <p>{dispalyLocation}</p>
            <p>
              {displayWebsite}
              {displayFacebook}
              {displayTwitter}
              {displayLinkedin}
              {displayInstagram}
              {displayYoutube}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
