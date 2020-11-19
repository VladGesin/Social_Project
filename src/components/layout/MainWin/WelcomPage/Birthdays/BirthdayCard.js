import React from 'react'



const BirthdayCard =(props)=> {

  const {users} = props;
  const dateConvert=(user)=>{
    
    let d = user.birth_date.toString().slice(0, 10).split('-');   
    let date = d[0] // 10/30/2010
    return date
  }

  return (
        <h5>{props.users.first_name+' '+props.users.last_name+ ' '+ dateConvert(users)}</h5>
    )
  }


export default BirthdayCard
