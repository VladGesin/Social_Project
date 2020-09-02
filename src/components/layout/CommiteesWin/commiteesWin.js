import React, { Component, Fragment } from "react";
import CommDescription from "./commDescription/commDescription";
import CommTable from "./commTable/commTable";
import CommAppeal from "./commAppeal/commAppeal";

export class CommiteesWin extends Component {
  render() {
    return (
      <Fragment>
        <div className="col">
          <CommDescription />
        </div>

        <div className="row">
          <div className="col">
            <CommAppeal />
          </div>
          <div className="col">
            <CommTable />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CommiteesWin;
