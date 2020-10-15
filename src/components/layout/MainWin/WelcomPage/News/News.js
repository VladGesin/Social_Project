import React, { useState,useEffect } from 'react';
import InfoCard from '../InfoCard/InfoCard';
import Carousel from 'react-bootstrap/esm/Carousel';
import Card from 'react-bootstrap/Card';


const News =({news})=> {

  const [newsList,setNewsList]= useState([])

  useEffect(() => {
    setNewsList(news['news'])
  }, [news])

    // let breakingNews = news['news'];
    console.log(news)
    console.log(newsList)
    
      
    return (
      <div>
        <Card className="text-right">
        <Card.Header as="h5">מבזקי חדשות</Card.Header>
          <Card.Body>
            <Card.Text dir="rtl">
                {newsList&&newsList.map(news=>(
                  <marquee behavior="scroll" direction="up" Scrollamount="4" loop="" overflow="hidden">
                    <div class="marquee">
                      <a href={news.link}>{news.name}</a>
                      <div>
                      <h7>{news.summary}</h7>
                      <h8>{news.date}</h8>
                      </div>
                    </div>
                  </marquee>
                  ))}
            </Card.Text>
          </Card.Body>
        </Card>
        
      </div>
    );
  }


export default News;
