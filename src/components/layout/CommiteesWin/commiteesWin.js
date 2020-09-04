import React, { Component, Fragment } from 'react';
import CommDescription from './commDescription/commDescription';
import CommTable from './commTable/commTable';

export class CommiteesWin extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <CommDescription />
          </div>

          <div className="row">
            <CommTable />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CommiteesWin;
