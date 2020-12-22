import React, { Fragment, useEffect, useState } from "react";
import CommDescription from "./commDescription/commDescription";
import CommTable from "./commTable/commTable";
import { useParams } from "react-router-dom";
import { committeesConfig } from "../MainCommitteesPage/committeesConfig";
import api from "../../../api";

const CommiteesWin = (props) => {
  console.log(props.location.aboutProps);
  const {name,desc}= props.location.aboutProps
  useEffect(() => {
    getCommittees();
  }, []);

  const [committeeData, setCommitteeData] = useState([]);

  const getCommittees = async ()=>{
        const res = await api.get(`committees`);
        setCommitteeData(res.data);
    }
    const x = useParams();
    console.log(x);
  //const { type } = useParams();
  /*const committee = committeeData.find(
    ({ name }) => name === type
  );*/

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <CommDescription commItem={props.location.aboutProps}  />
        </div>

        <div className="row">
          <CommTable commItem={props.location.aboutProps} />
        </div>
      </div>
    </Fragment>
  );
};

export default CommiteesWin;
