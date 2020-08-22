import React, { Fragment } from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import InfoCard from '../WelcomPage/InfoCard/InfoCard';
import './WelcomPage.css';

const WelcomPage = () => {
  return (
    <Fragment>
      <Container>
        <div className="row justify-content-md-center">
          <div className="col-md-8 ">
            <div className="row d-block ">
              <Slider />
            </div>
            <div className="row d-block  ">
              <InfoCard />
            </div>
          </div>

          <div className="col">
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default WelcomPage;
