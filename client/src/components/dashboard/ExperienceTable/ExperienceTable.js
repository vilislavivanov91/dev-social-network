import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../../actions/profile';

class ExperienceTable extends Component {
  onExperienceDelete = (id) => {
    this.props.deleteExperience(id);
  };

  render() {
    const { experiences } = this.props;
    const expTable = experiences.map((experience) => (
      <tr key={experience._id}>
        <td>{experience.company}</td>
        <td>{experience.title}</td>
        {/* <td>{moment(experience.from, 'DD/MM/YYYY')} - {experience.current ? 'now' : moment(experience.to, 'DD/MM/YYYY')}</td> */}
        <td>
          <Moment date={experience.from} format="DD/MM/YYYY" /> -{' '}
          {experience.current ? (
            'now'
          ) : experience.to ? (
            <Moment data={experience.to} format="DD/MM/YYYY" />
          ) : (
            'no date provided'
          )}
        </td>
        <td></td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.onExperienceDelete(experience._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{expTable}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteExperience })(ExperienceTable);
