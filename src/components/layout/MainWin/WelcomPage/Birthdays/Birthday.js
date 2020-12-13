import React, { Component } from 'react';
import BirthdayCard from '../Birthdays/BirthdayCard'
import Card from 'react-bootstrap/Card';



export class Birthday extends Component {


  render() {  
    let userList = this.props.users;
    let userId = 1;

    function keyId() {
      userId=userId+1
      return userId
    }

    return (
      <div>
        <Card className="text-right">
        <Card.Header as="h5">ימי הולדת</Card.Header>
        <marquee behavior="scroll" direction="up" scrollamount="4" loop="" overflow="hidden" display="inline-block">
          <Card.Body dir="rtl">
            {/* <Card.Text> */}
                {userList.map(users=>(
                   <BirthdayCard users={users} key={keyId()} />
                ))}
            {/* </Card.Text> */}
          </Card.Body>
          </marquee>
        </Card>
        
      </div>
    );
  }
}

export default Birthday;
