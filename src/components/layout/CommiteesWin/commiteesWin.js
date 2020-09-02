import React, { Component, Fragment } from 'react';
import CommDescription from './commDescription/commDescription';
import CommTable from './commTable/commTable'

export class CommiteesWin extends Component {
  render() {
    return (
      <Fragment>
        <CommDescription />
        <CommTable />
      </Fragment>
    );
  }
}

export default CommiteesWin;
