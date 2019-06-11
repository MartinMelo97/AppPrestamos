import React, { Component } from 'react'
import './today.scss'
import arrow from '../../../assets/icons/left-arrow.svg'

class Today extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[
                {
                    name: "Alicia",
                    total: 5000
                },
                {
                    name: "Alicia",
                    total: 5000
                },
                {
                    name: "Alicia",
                    total: 5000
                }
            ],
            blues:[],
            day: 10,
            actualDay: null
        }
    }

    bluesGenerate = () =>{
        let { blues } = this.state

        let optionsB = ['7','8','9','a','b','c','d','e','f']
        let optionsRG = ['0','1','2']

        let blue = '#'
        let random

        for(let i = 0; i < 500; i++){
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsRG.length)
                console.log(random)
                blue += optionsRG[random]
            }
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsB.length)
                console.log(random)
                blue += optionsB[random]
            }
            blues.push(blue)
            blue = '#'
        }
        //console.log(reds)
        this.setState({ blues })
    }

    componentDidMount = () =>{
        this.bluesGenerate()
        let { actualDay } = this.state
        actualDay = new Date().getDate()
        this.setState({ actualDay })
    }

    render(){
        return(
            <div className="general-today-container">
                <div className="today-header">
                    <img src={ arrow } alt="anterior"/>
                    
                    {this.state.day === this.state.actualDay ? 
                    <span>Hoy</span>
                    :
                    <span>{this.state.day}</span>}

                    {this.state.day === this.state.actualDay ? 
                    null
                    :
                    <img src={ arrow } alt="siguiente"/>}
                </div>
            </div>
        )
    }
}

export default Today