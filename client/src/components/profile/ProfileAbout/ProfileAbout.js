import React from 'react';

const ProfileAbout = ({ profile }) => {
  const skillsListDisplay = profile.skills.map((skill, index) => (
    <div key={skill + index} className="p-3">
      <i className="fa fa-check"></i> {skill}
    </div>
  ));

  const firstName = profile.user.name.trim(' ').split(' ')[0];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">{profile.bio ? profile.bio : 'No bio added'}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skillsListDisplay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
