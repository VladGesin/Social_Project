import React, { Component, Fragment } from 'react';
import CommDescription from './commDescription/commDescription';
import CommTable from './commTable/commTable'
import CommAppeal from './commAppeal/commAppeal'

export class CommiteesWin extends Component {
  render() {
    return (
      <Fragment>
        <CommDescription />
        <CommTable />
        <CommAppeal />
      </Fragment>
    );
  }
}

export default CommiteesWin;
