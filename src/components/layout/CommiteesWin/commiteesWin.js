import React, { Fragment, useEffect, useState, useContext } from "react";
import CommDescription from "./commDescription/commDescription";
import CommTable from "./commTable/commTable";
import { useParams } from "react-router-dom";
import api from "../../../api";
import uuid from "react-uuid";
import Context from '../../../store/Context';

export const CommiteesWin = (props) => {
   //const {name ,desc} = props.location.aboutProps
   //console.log(props)
   const context = useContext(Context);
   const [commObj, setCommObj] = useState({});
   const [isAllowed, setIsAllowed] = useState(false);
   const commName = useParams().type;

   const [committeeData, setCommitteeData] = useState([]);
   const [reRender, setReRender] = useState(false);

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

      const getCommitteesData = async () => {
         const res = await api.get(`committeeParticipants/${commName}`);
         console.log('idannnnn')
         console.log(res.data);
         const data = res.data.map((cur, i) => {
            return {
               ...cur.user,
               committeePosition: cur.committeePosition,
               index: i + 1,
            };
         });
         console.log('after idannn')
         console.log(res.data);
         setCommitteeData(data);
      };

      isAllowedAddOrRemoveCommMember();
      getCommitteesData();
      getCommittees();
   }, [reRender]);
   
   const isAllowedAddOrRemoveCommMember = () => {
      if(context.userState.userType === 'chairperson') {
         setIsAllowed(true);
      }
   }

   //const [committeeData, setCommitteeData] = useState([]);

   //const { type } = useParams();

   //console.log(type);
   //const committee = committeeData.find(({ name }) => name === commName);

   return (
      <Fragment>
         <div className="container">
            <div className="row">
               <CommDescription
                  commItem={commObj}
                  setCommItem={setCommObj}
                  committeeData={committeeData}
                  setCommitteeData={setCommitteeData}
                  setReRender={setReRender}
                  reRender={reRender}
                  isAllowed={isAllowed}
               />
            </div>

            <div className="row">
               <CommTable
                  commItem={commObj}
                  committeeData={committeeData}
                  setCommitteeData={setCommitteeData}
                  setReRender={setReRender}
                  isAllowed={isAllowed}
               />
            </div>
         </div>
      </Fragment>
   );
};

export default CommiteesWin;
