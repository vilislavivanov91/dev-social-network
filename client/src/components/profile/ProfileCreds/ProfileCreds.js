import React from 'react';
import Moment from 'react-moment';

const ProfileCreds = ({ profile }) => {
  let displayEducation;
  let displayExperience;

  if (profile.education.length > 0) {
    displayEducation = profile.education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment date={edu.from} format="MMM YYYY" /> -{' '}
          {edu.current ? 'Now' : <Moment date={edu.to} format="MMM YYYY" />}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          <strong>Description:</strong>{' '}
          {edu.description ? edu.description : 'No description added'}
        </p>
      </li>
    ));
  } else {
    displayEducation = 'No education added yet';
  }

  if (profile.experience.length > 0) {
    displayExperience = profile.experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <Moment date={exp.from} format="MMM YYYY" /> -{' '}
        {exp.current ? 'Now' : <Moment date={exp.to} format="MMM YYYY" />}
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          <strong>Description:</strong>{' '}
          {exp.description ? exp.description : 'No description added'}
        </p>
      </li>
    ));
  } else {
    displayExperience = 'No experience added yet';
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">{displayExperience}</ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">{displayEducation}</ul>
      </div>
    </div>
  );
};

export default ProfileCreds;
