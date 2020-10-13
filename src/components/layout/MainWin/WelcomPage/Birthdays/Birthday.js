import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import BirthdayCard from '../Birthdays/BirthdayCard'
import Carousel from 'react-bootstrap/esm/Carousel';
import Card from 'react-bootstrap/Card';
import CardData from '../InfoCard/cardText';



export class Birthday extends Component {

  render() {  

     const getThreeItems = () => {
        var newData = [];
        var setOfThree = [];

        for (let i = 0; i < this.props.users.length; i++) {
          setOfThree.push(this.props.users[i]);

          if (i % 3 == 1) {
            newData.push(setOfThree);
            setOfThree = [];

        return (setOfThree)
  }
}
      } 
    
    const userBirthday=this.props.users.map((user)=>(
      <Carousel.Item>
      <BirthdayCard user={user} key={user.id} />
      </Carousel.Item>
      ))

    let setOfThree = getThreeItems()
    return (

      <div>
        <Card className="text-right">
        <Card.Header as="h5">ימי הולדת</Card.Header>
        <Card.Body>
          <Card.Text>
            <Carousel>
              {setOfThree}
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
