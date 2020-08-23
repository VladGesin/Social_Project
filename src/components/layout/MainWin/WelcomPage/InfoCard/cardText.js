import React from 'react';
// import Card from 'react-bootstrap/Card';

const CardData = (props) => {
  return (
    <div>
      <li dir="rtl">{props.value.text}</li>
    </div>
  );
};

export default CardData;
