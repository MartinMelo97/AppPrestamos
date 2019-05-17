import React, { Component } from 'react'
import sun from './assets/icons/sun.svg'

const HamburgerMenu = (props) =>{
    return(
        <div className={ "side-bar-content " + props.active }>
            <div className="side-bar">
                <div className="day">
                    <p>{props.day}</p>
                    <img src={sun} alt="sol"/>
                    <p>{props.user}</p>
                </div>
                <div className="options-side-bar">
                    {props.options.map((option, index)=>(
                        <p>{option}</p>
                    ))}
                </div>
            </div>
            <div className="on-click-exit" onClick={props.sidebar}></div>
        </div>
    )
}

export default HamburgerMenu