import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';

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
    return (
      <div>
        <InfoCard dataItem={this.state} />
      </div>
    );
  }
}

export default Birthday;
