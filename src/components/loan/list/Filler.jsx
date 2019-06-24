import React, { Component } from 'react'
import './Filler.scss'
const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
  }

  export default Filler