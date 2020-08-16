import React, { Fragment } from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoCard from '../WelcomPage/InfoCard/InfoCard';

const WelcomPage = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={8}>
            <Slider />
          </Col>
          <Col>
            <Row>
              <InfoCard />
            </Row>
            <Row>
              <InfoCard />
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default WelcomPage;
