import React, { Fragment } from 'react';

const InfoCardMap = (props) => {
  return (
    <Fragment>
      <tr>
        <td>{props.card.index}</td>
        <td>{props.card.firstName} {props.card.lastName}</td>
        <td>{props.card.type === 'admin'? "מנהל מערכת" : props.card.type === 'chairperson'? "יושב ראש" : props.card.type === 'committee'? "חבר ועדה" : "הורה"}</td>
        <td>{props.card.phone}</td>
        <td><a href={`mailto:${props.card.email}`}>{props.card.email}</a></td>
        {props.isAllowed && <td>
          <i className="far fa-trash-alt" onClick={() => props.onDelete(props.card)}></i>
        </td>}
      </tr>
    </Fragment>
  );
};

export default InfoCardMap;
