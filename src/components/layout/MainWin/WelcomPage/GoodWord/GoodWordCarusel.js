import React ,{useEffect,useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import api from "../../../../../api";


const GoodWordCarusel=()=> {

const [goodWord,setGoodWord] = useState([]); //hook goodword


  useEffect(() => {
    getGoodWord();
  }, [])

  function getGoodWord() {
    api.get('goodWord').then(res=>setGoodWord(res.data)
    );
  }
  const dateConvert=(time)=>{
    
    let d = time.toString().slice(0, 10).split('-');   
    let date = d[2] +'-'+ d[1]+'-' + d[0] // 10/30/2010
    return date
  }

    return (
      <div>
        <Carousel indicators={false} interval={2000}>
        {
          goodWord.map( goodItem=>(
            <Carousel.Item key={goodItem.serial_id} dir="rtl">
            <h2>וועדה: {goodItem.committee_name}</h2>
            <h3>לכבוד: {goodItem.serial_id}</h3>
            <h5>תוכן: {goodItem.content}</h5>
            <h6>{dateConvert(goodItem.time)}</h6>
            </Carousel.Item>   
          ))
        }
        </Carousel>
      </div>
    )
  }


export default GoodWordCarusel
