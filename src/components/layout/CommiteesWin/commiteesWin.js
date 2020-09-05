import React, { Fragment } from "react";
import CommDescription from "./commDescription/commDescription";
import CommTable from "./commTable/commTable";

const CommiteesWin = () => {
  const CommList = {
    education: [
      {
        name: "ועדת חינוך",
        desc: "פירוט רחב על כלל המידע הנוגע לועדה",
      },
    ],
    sport: [
      {
        name: "ועדת ספורט",
        desc: "פירוט רחב על כלל המידע הנוגע לועדה",
      },
    ],
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <CommDescription CommItem={CommList.education} />
        </div>

        <div className="row">
          <CommTable />
        </div>
      </div>
    </Fragment>
  );
};

export default CommiteesWin;
