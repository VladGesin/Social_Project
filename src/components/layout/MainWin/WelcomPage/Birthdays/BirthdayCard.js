import React, { Fragment } from 'react'



const BirthdayCard =(props)=> {

  const {users} = props
   const dateConvert=()=>{
    
    let d = props.user.birth_date.toString().slice(0, 10).split('-');   
    let date = d[1] +'/'+ d[2] +'/'+ d[0] // 10/30/2010
    return date
  }

    console.log(users.map(user => user))
    return (
    users.map(user => (
      <Fragment>
          {/* {console.log(props.user.first_name)} */}
        <h6>{user.first_name+' '+user.last_name}</h6>
        {/* <h7>{dateConvert()}</h7> */}
      </Fragment>
    ))
    )
    
  }


export default BirthdayCard
