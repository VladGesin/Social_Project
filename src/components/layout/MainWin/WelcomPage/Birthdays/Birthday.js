import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import BirthdayCard from '../Birthdays/BirthdayCard'
import Carousel from 'react-bootstrap/esm/Carousel';
import Card from 'react-bootstrap/Card';
import CardData from '../InfoCard/cardText';



export class Birthday extends Component {


  // Split the users list to set of three in order to render them properly in the BirthdayCard
  getThreeItems = (userList) => {
        let newData = [];
        let setOfThree = [];

        for (let i = 0; i < userList.length; i++) {
          setOfThree.push(userList[i]);
          // Insert a set of three users into the new list of threes'
          if (setOfThree.length == 3) {
            newData.push(setOfThree);
            setOfThree = [];
          }
        }
        // Add the leftover list of users
        if (setOfThree.length > 0){
          newData.push(setOfThree);
        }
        return (newData)
  }
  
  render() {  
    let userList = this.props.users;
    let threeUsers= this.getThreeItems(userList);
    const userBirthday=threeUsers.map(users=>{
      return (
        <Carousel.Item>
        <BirthdayCard users={users} />
        </Carousel.Item>
      )
    }
      )
    return (
      <div>
        <Card className="text-right">
        <Card.Header as="h5">ימי הולדת</Card.Header>
          <Card.Body>
            <Card.Text>
              <Carousel controls={false} indicators={false}>  
                {userBirthday}
              </Carousel>
            </Card.Text>
          </Card.Body>
        </Card>
        
      </div>
    );
  }
}

export default Birthday;
