import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';

export class News extends Component {
  state = {
    header: ['חדשות'],
    NewsCard: [
      {
        text: ['חדשות מארהב'],
      },
      {
        text: ['חדשות ישראל '],
      },
      {
        text: ['חדשות ארצות ערב '],
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

export default News;
