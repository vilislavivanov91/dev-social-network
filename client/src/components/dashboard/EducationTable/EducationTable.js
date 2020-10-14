import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from '../../../actions/profile';

class EducationTable extends Component {
  onEducationDelete = (id) => {
    this.props.deleteEducation(id);
  };

  render() {
    const { educations } = this.props;
    const eduTable = educations.map((education) => (
      <tr key={education._id}>
        <td>{education.school}</td>
        <td>{education.degree}</td>
        <td>
          <Moment date={education.from} format="DD/MM/YYYY" /> -{' '}
          {education.current ? (
            'now'
          ) : education.to ? (
            <Moment data={education.to} format="DD/MM/YYYY" />
          ) : (
            'no date provided'
          )}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.onEducationDelete(education._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{eduTable}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteEducation })(EducationTable);
