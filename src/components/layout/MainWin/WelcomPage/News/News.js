import React, { Component } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import Carousel from 'react-bootstrap/esm/Carousel';
import Card from 'react-bootstrap/Card';


export class News extends Component {

render() {  
    let breakingNews = this.props.news['news'];
    const singleNewsReport=breakingNews.map(news=>{
      return (
        <Carousel.Item>
          <a href={this.props.news.link}>{this.props.news.name}</a>
        </Carousel.Item>
      )
    }
      )
    return (
      <div>
        <Card className="text-right">
        <Card.Header as="h5">מבזקי חדשות</Card.Header>
          <Card.Body>
            <Card.Text>
              <Carousel controls={false} indicators={false}>  
                {singleNewsReport}
              </Carousel>
            </Card.Text>
          </Card.Body>
        </Card>
        
      </div>
    );
  }
}

export default News;
