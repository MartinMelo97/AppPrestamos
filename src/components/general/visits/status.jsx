import React from 'react'
import './index.scss'
const Status = (props) => {
  if(props.status === true){
    return <div className="circle-item" style={{backgroundColor: '#52c41a'}}/>
  }
  if(props.status === false){
    return  <div className="circle-item" style={{backgroundColor: '#f5222d'}}/>
  }
  if(props.status === 0){
    return  <div className="circle-item" style={{backgroundColor: '#faad14'}}/>
  }
}
export default Status