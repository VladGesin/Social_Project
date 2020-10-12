import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import BirthdayCard from '../Birthdays/BirthdayCard'

export class Birthday extends Component {

  state = {
    header: ['ימי הולדת'],
    NewsCard: [
      {
        text: ['נולד היום '],
      },
      {
        text: ['נולד אתמול '],
      },
      {
        text: ['יוולד מחר'],
      },
    ],
  };

  render() {  
    const userBirthday=this.props.users.map((user)=>(
      <BirthdayCard user={user} key={user.id} />
      ))
    return (
      <div>
    {userBirthday}
        {/* <InfoCard dataItem={userBirthday}  /> */}
      </div>
    );
  }
}

export default Birthday;
