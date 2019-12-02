import React from 'react'
import './Filler.scss'
const Filler = (props) => {
  if(props.percentage < 100){
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
  }
  else {
    return <div className="filler" style={{ width: `${props.percentage}%`, backgroundColor: '#52c41a' }} />
  }  
}

  export default Filler