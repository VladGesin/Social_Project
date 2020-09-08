import React, { Fragment } from 'react';
import CommDescription from './commDescription/commDescription';
import CommTable from './commTable/commTable';
import { useLocation } from 'react-router-dom';

const CommiteesWin = (props) => {
  const CommList = {
    education: {
      name: 'ועדת חינוך',
      desc: 'פירוט רחב על כלל המידע הנוגע לועדה',
    },

    sport: {
      name: 'ועדת ספורט',
      desc: 'פירוט רחב על כלל המידע הנוגע לועדה',
    },
  };

  const location = useLocation();
  return (
    <Fragment>
      {console.log(CommList[location.state.item])}
      <div className="container">
        <div className="row">
          <CommDescription commItem={CommList[location.state.item]} />
        </div>

        <div className="row">
          <CommTable />
        </div>
      </div>
    </Fragment>
  );
};

export default CommiteesWin;
