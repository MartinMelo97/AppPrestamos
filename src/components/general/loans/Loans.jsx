import React, { Component } from 'react'
import './loans.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import firebase from 'firebase' 
class Loans extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            blues:[],
            day: 1,
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
                blue += optionsRG[random]
            }
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsB.length)
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

        firebase.firestore().collection('loan')
            .onSnapshot((dates)=>{
            let names = []
            dates.forEach(date=>{
                let dato = date.data()
                names.push(dato)
            })
            console.log(names)
            this.setState({customers: names})
        })
    }

    render(){
        return(
            <div className="general-loans-container">
                <div className="loans-header">
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
                <div className="customers-container">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="loans-container"
                        style = {{
                            backgroundColor : this.state.blues[i]
                        }}>
                            <span>{customer.Cliente}</span>
                            <span>${customer.Cantidad}</span>
                        </div>
                    ))
                    :
                    null}
                </div>
                <div className="transparent-white-div"/>
            </div>
        )
    }
}

export default Loans