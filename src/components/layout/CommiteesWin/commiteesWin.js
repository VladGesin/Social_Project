import React, { Fragment, useEffect, useState } from "react";
import CommDescription from "./commDescription/commDescription";
import CommTable from "./commTable/commTable";
import { useParams } from "react-router-dom";
import api from "../../../api";

export const CommiteesWin = (props) => {
  //const {name ,desc} = props.location.aboutProps
  //console.log(props)
  const [commObj, setCommObj] = useState({});
  const commName = useParams().type;

  useEffect(() => {
    const getCommittees = async () => {
      //return all committees;
      try {
        const res = await api.get(`committees`);
        const obj = res.data.find(({ name }) => name === commName);
        setCommObj(obj);
        //setCommitteeData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getCommittees();
  }, []);

  //const [committeeData, setCommitteeData] = useState([]);

  //const { type } = useParams();

  //console.log(type);
  //const committee = committeeData.find(({ name }) => name === commName);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <CommDescription commItem={commObj} />
        </div>

        <div className="row">
          <CommTable commItem={commObj} />
        </div>
      </div>
    </Fragment>
  );
};

export default CommiteesWin;
