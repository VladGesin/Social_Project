import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import BirthdayCard from '../Birthdays/BirthdayCard'
import Carousel from 'react-bootstrap/esm/Carousel';
import Card from 'react-bootstrap/Card';
import CardData from '../InfoCard/cardText';



export class Birthday extends Component {

  getThreeItems = (userList) => {
        console.log(userList)
        let newData = [];
        let setOfThree = [];

        for (let i = 0; i <= userList.length; i++) {
          setOfThree.push(userList[i]);
          
          if (i % 3 == 1) {
            console.log(setOfThree);
            newData.push(setOfThree);
            setOfThree = [];
          }
        }

        return (newData)
  }
  
  render() {  
    let userList = this.props.users;
    let three= this.getThreeItems(userList)
    const userBirthday=three.map(users=>{
      return (
        <Carousel.Item>
        <BirthdayCard users={users} />
        </Carousel.Item>
      )
    }
      )
    console.log('userBirthday',userBirthday)
    return (
      <div>
        <Card className="text-right">
        <Card.Header as="h5">ימי הולדת</Card.Header>
        <Card.Body>
          <Card.Text>
            <Carousel>  
              {userBirthday}
            </Carousel>
          </Card.Text>
        </Card.Body>
      </Card>
        
        {/* <InfoCard dataItem={userBirthday}  /> */}
      </div>
    );
  }
}

export default Birthday;
