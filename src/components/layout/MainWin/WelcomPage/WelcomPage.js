import React, { Fragment,useEffect , useState ,useContext} from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
import GoodWord from '../WelcomPage/GoodWord/GoodWord';
import News from '../WelcomPage/News/News';
import Birthday from '../WelcomPage/Birthdays/Birthday';
import Teachers from '../WelcomPage/PrivateTeacher/PrivateTeacher';
import axios from 'axios';



import './WelcomPage.css';
import api from "../../../../api";

const WelcomPage = () => {
  const [users, setUsers] =useState([]); //hook 
  const [news, setNews] = useState([]); // hook news
  

  useEffect(() => {
    getUsers();
    getNews('תלמיד');

  }, []);

  function getUsers() {
    api.get('users').then(res => setUsers(res.data));
  }

  function getNews(key) {
    api.get(`news?filterBy=${key}`).then(res => setNews(res.data));
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
            <News news={news}/>
            <Birthday users={users}/>
            <Teachers />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default WelcomPage;
