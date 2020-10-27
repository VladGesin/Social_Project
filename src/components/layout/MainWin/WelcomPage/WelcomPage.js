import React, { Fragment,useEffect , useState ,useContext} from 'react';
import Slider from './Slider/Slider';
import Container from 'react-bootstrap/Container';
import GoodWord from '../WelcomPage/GoodWord/GoodWord';
import News from '../WelcomPage/News/News';
import Birthday from '../WelcomPage/Birthdays/Birthday';
import Teachers from '../WelcomPage/PrivateTeacher/PrivateTeacher';
import axios from 'axios';
import Context from '../../../../store/Context'


import './WelcomPage.css';

const WelcomPage = () => {
  const [users, setUsers] =useState([]); //hook 
  const [news, setNews] = useState([]); // hook news
  const context = useContext(Context)

  console.log(`Bearer  ${context.userState.token}`)

  

  useEffect(() => {
    getUsers();
    getNews('תלמיד');

  }, [users,news]);


  async function getUsers() {

    axios.get('http://localhost:8080/users',{
      headers: {
        Authorization: `Bearer ${context.userState.token} `
      }
  }).then(res => 
    setUsers(res.data),
    console.log(users)
    )
  }

  async function getNews(key) {

    await axios.get(`http://localhost:8080/news?filterBy=${key}`,{
      headers: {
        Authorization: `Bearer ${context.userState.token} `
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
