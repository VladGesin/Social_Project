import React, { Fragment } from 'react'



const BirthdayCard =(props)=> {

   const dateConvert=()=>{
    
    let d = props.user.birth_date.toString().slice(0, 10).split('-');   
    let date = d[1] +'/'+ d[2] +'/'+ d[0] // 10/30/2010
    return date
  }

 
    return (
      <Fragment>
          {/* {console.log(props.user.first_name)} */}
        <h6>{props.user.first_name+' '+props.user.last_name}</h6>
        <h7>{dateConvert()}</h7>
      </Fragment>
    )
    
  }


export default BirthdayCard
