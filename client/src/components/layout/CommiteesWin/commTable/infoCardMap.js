import React, { Fragment } from 'react';
import avatar from '../../../Icons/Avatars/avatar.png';

const InfoCardMap = (props) => {
  return (
    <Fragment>
      <tr>
        <img className="avatar" alt="avatar" src={avatar}></img>
        <td>{props.card.index}</td>
        <td>{props.card.name}</td>
        <td>{props.card.position}</td>
        <td>{props.card.phone}</td>
        <td>         
         <a href={`mailto:${props.card.mail}`}>{props.card.mail}</a>
        </td>
      </tr>
    </Fragment>
  );
};

export default InfoCardMap;
