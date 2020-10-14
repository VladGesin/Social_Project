import React, { Fragment } from 'react'



const BirthdayCard =(props)=> {

  const {users} = props;
  const dateConvert=(user)=>{
    
    let d = user.birth_date.toString().slice(0, 10).split('-');   
    let date = d[0] // 10/30/2010
    return date
  }

  return (
    users.map(user => (
      <Fragment>
          {/* {console.log(props.user.first_name)} */}
        <h5><li dir='rtl'>{user.first_name+' '+user.last_name+ ' '+ dateConvert(user)}</li></h5>
        {/* <h7>{dateConvert(user)}</h7> */}
      </Fragment>
    ))
    )
  }


export default BirthdayCard
