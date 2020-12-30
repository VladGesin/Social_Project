import React, { Fragment } from 'react';

const InfoCardMap = (props) => {
  return (
    <Fragment>
      <tr>
        <td>{props.card.index}</td>
        <td>{props.card.firstName} {props.card.lastName}</td>
        <td>{props.card.committeePosition}</td>
        <td>{props.card.phone}</td>
        <td><a href={`mailto:${props.card.email}`}>{props.card.email}</a></td>
      </tr>
    </Fragment>
  );
};

export default InfoCardMap;
