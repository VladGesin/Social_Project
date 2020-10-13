import React, { useEffect,useState } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import BirthdayCard from '../Birthdays/BirthdayCard'
import Carousel from 'react-bootstrap/esm/Carousel';
import Card from 'react-bootstrap/Card';
import CardData from '../InfoCard/cardText';



const Birthday =(props)=> {

  const [userList,setList]= useState([]);
  const [users,setUsers]=useState([props['users']]);
  
  console.log(props);
  console.log(users);


  useEffect(() => {
    console.log(users);
    getThreeItems(props.users);
    console.log('2')

  }, []);


     const getThreeItems = (users) => {
      
      var newData = [];
      var setOfThree = [];


        for (let i = 0; i < users.length; i++) {
          setOfThree.push(users[i]);

          if (i % 3 == 1) {
            newData.push(setOfThree);
            setOfThree = [];
          }
        }
        

        setList(newData)
        return (newData)
      }

    return (

      <div>
        <Card className="text-right">
        <Card.Header as="h5">ימי הולדת</Card.Header>
        <Card.Body>
          <Card.Text>
            <Carousel>
              {userList.map((userList)=>(
                    userList.map((user)=>(
                    <Carousel.Item>
                    <BirthdayCard user={user} key={user.id} />
                    </Carousel.Item>
              ))))}
            </Carousel>
          </Card.Text>
        </Card.Body>
      </Card>
        
      </div>
    );
  }


export default Birthday;
