import React, { Fragment,useEffect , useState} from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
import GoodWord from '../WelcomPage/GoodWord/GoodWord';
import News from '../WelcomPage/News/News';
import Birthday from '../WelcomPage/Birthdays/Birthday';
import Teachers from '../WelcomPage/PrivateTeacher/PrivateTeacher';
import axios from 'axios';


import './WelcomPage.css';

const WelcomPage = () => {
  const [users, setUsers] =useState([]); //hook 
  const [news, setNews] = useState([]); // hook news
  
  useEffect(() => {
    getUsers();
    getNews('תלמיד');

  }, []);


  async function getUsers() {

    axios.get('http://localhost:8080/users',{
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMyMSwiaWF0IjoxNjAyNjg5NTY3fQ.Dd7PS5MsC0OBuo1br8rwV__ISSfh50akpBgDf7n9Whc'
      }
  }).then(res => 
    setUsers(res.data))
  }

  async function getNews(key) {

    await axios.get(`http://localhost:8080/news?filterBy=${key}`,{
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMyMSwiaWF0IjoxNjAyNjg5NTY3fQ.Dd7PS5MsC0OBuo1br8rwV__ISSfh50akpBgDf7n9Whc'
      }
  }).then(res => 
    setNews(res.data))
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
