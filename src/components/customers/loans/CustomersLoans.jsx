import React, { Component } from 'react'
import './customers_loans.scss'
import plus from '../../../assets/icons/plus.svg'
import info from '../../../assets/icons/information.svg'

class CustomersLoans extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[
                {
                    name: 'Alicia'
                },
                {
                    name: 'Montse'
                },
                {
                    name: 'Gabriel'
                },
                {
                    name: 'Isaac'
                },
                {
                    name: 'Daniel'
                },
                {
                    name: 'Martin'
                },
                {
                    name: 'Indra'
                },
                {
                    name: 'Jesus'
                },
                {
                    name: 'Oscar'
                },
                {
                    name: 'Arturo'
                },
                {
                    name: 'Topi'
                },
                {
                    name: 'David'
                },
            ],
            reds:[]
        }
    }

    redsGenerate = () =>{
        let { reds } = this.state

        let optionsR = ['5','6','7','8','9','a','b','c','d','e','f']
        let optionsGB = ['0','1','2','3']

        let red = '#'
        let random

        for(let i = 0; i < 500; i++){
            for(let i = 0; i < 2; i++){
                random = Math.floor(Math.random() * optionsR.length)
                console.log(random)
                red += optionsR[random]
            }
            for(let i = 0; i < 4; i++){
                random = Math.floor(Math.random() * optionsGB.length)
                console.log(random)
                red += optionsGB[random]
            }
            reds.push(red)
            red = '#'
        }
        //console.log(reds)
        this.setState({ reds })
    }

    componentDidMount = () =>{
        this.redsGenerate()
    }

    render(){
        return(
            <div className="customers-loans-container">
                <p className="customers-loans-title">Clientes
                <img src={ plus } alt="agregar"/>
                </p>
                <div className="info-customers-container">
                    {this.state.customers.map((customer, i)=>(
                        <div className="info-customer-container">
                            <span style = {{
                                backgroundColor : this.state.reds[i]
                            }}>{customer.name}</span>
                            <img src={ info } alt="info"/>
                        </div>
                    ))}
                </div>
                <div className="transparent-white-div"/>
            </div>
        )
    }
}

export default CustomersLoans