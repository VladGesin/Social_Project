import React, { Fragment,useEffect , useState} from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
import GoodWord from '../WelcomPage/GoodWord/GoodWord';
import News from '../WelcomPage/News/News';
import Birthday from '../WelcomPage/Birthdays/Birthday';
import Teachers from '../WelcomPage/PrivateTeacher/PrivateTeacher';
import axios from 'axios';

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import './WelcomPage.css';

const WelcomPage = () => {
  const [users, setUsers] =useState([]); //hook 
  
  useEffect(() => {
    // login();
    getUsers();

  }, []);

  // async function login() {
  //   axios.post('http://localhost:8080/login',{
  //     password:"1234",
  //     userID:111111111
  //   }).then(res => setToken(res.data.token[0].token))
  // }

  async function getUsers() {
    axios.get('http://localhost:8080/users',{
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMyMSwiaWF0IjoxNjAyNjA2OTU0fQ.pnLra1Aec6V2N6JaDeTernsNC2Pioaqsn1USPb9GWUA' //the token is a variable which holds the token
      }
  }).then(res => 
    setUsers(res.data))
  }
  

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
            <Birthday users={users}/>
            <Teachers />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default WelcomPage;
