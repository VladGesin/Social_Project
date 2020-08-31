import React, { Fragment } from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
import GoodWord from '../WelcomPage/GoodWord/GoodWord';
import News from '../WelcomPage/News/News';
import Birthday from '../WelcomPage/Birthdays/Birthday';
import Teachers from '../WelcomPage/PrivateTeacher/PrivateTeacher';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import InfoCard from './InfoCard/InfoCard';

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
              <GoodWord />
            </div>
          </div>

          <div className="col">
            <News />
            <Birthday />
            <Teachers />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default WelcomPage;
