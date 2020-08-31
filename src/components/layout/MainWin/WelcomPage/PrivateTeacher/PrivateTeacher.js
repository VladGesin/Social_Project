import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';

export class Teachers extends Component {
  state = {
    header: ['מורים פרטיים'],
    NewsCard: [
      {
        text: ['מורה תותח '],
      },
      {
        text: ['מורה מלך '],
      },
      {
        text: ['מורה שמלמד קורס באלגוריטמים '],
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

export default Teachers;
