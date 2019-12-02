import React, { Component } from 'react'
import './index.scss'
import Circle from './status'
//import {toast} from 'react-toastify'
export default class Visits extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[{name: "Juan", visited: 0},
            {name: "Jorge", visited: 0},
            {name: "Pedro", visited: 0}],
            Gral: [], 
            datesLoan: {
                id: ""
            },
            newArray: [],
            num: 0,
            position: null,
            numM: 1,
            random: 5,
            List: []
        }
    }
    edit = () =>{
        console.log("Edito")
    }
    more = () =>{
        var cont
        if(this.state.num-1<0){
            cont=0
        }else{
            cont=this.state.num+1-1
        }
        document.getElementById(cont).className = "visit-container"
        let array = this.state.customers
        var click=this.state.num, n
        const actualIndex = this.state.position
        if (click>array.length-1){
            n = 0
            this.setState({num: 1, position: 0})
          } else {
            n=click
            this.setState({num: this.state.num + 1, position: this.state.position + 1 })
          }
        document.getElementById(n).className = "visit-select"
        const newIndex = n
        const temporalData = array[actualIndex]
        array.splice(actualIndex, 1)
        array.splice(newIndex, 0, temporalData)
        this.setState({customers: array})
    }
    back = () =>{
        document.getElementById(this.state.num-1).className = "visit-container"
        let array = this.state.customers
        var click=this.state.num-1,n,p
        if (click<0){
            n = 0
            this.setState({num: 0, position: 1})
            document.getElementById('back').disabled = true
        }
        else {
            n=click
            this.setState({num: this.state.num - 1, position: this.state.position - 1 })
        }

        if (this.state.position < 0){
            p=array.length - 1
            this.setState({position: array.length - 1, num: this.state.num - 1})
        } else{
            p=this.state.position
        }
        document.getElementById(n).className = "visit-select"
        const newIndex = n
        const actualIndex = p
        console.log("Posicion "+actualIndex)
        console.log("Clicks "+n)
        const temporalData = array[actualIndex]
        array.splice(actualIndex, 1)
        array.splice(newIndex, 0, temporalData)
        console.log(array)
        this.setState({customers: array})
    }
    save = () =>{
        document.getElementById('buttons-container').className = "buttons-not"
        document.getElementById(this.state.position).className = "visit-container"
    }
    
    render(){
        return(
            <div className="general-loans-container">
                <p className="customers-loans-title">Visitas
                </p>
                <div className="buttons-not" id="buttons-container">
                    {this.state.position===0? null :
                    <button className="btn-circle" id="back" onClick={this.back}>^</button>
                    }
                    <button className="btn-circle" id="left"onClick={this.more}>v</button>
                    <button className="btn-save" onClick={this.save}>Guardar</button>
                </div>
                <div className="visit">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="visit-container-gral" key={i}>
                        <div className="visit-container" id={i}
                        onClick={() => {
                            this.setState({position: i, num: i+1})
                            document.getElementById(i).className = "visit-select"
                            document.getElementById('buttons-container').className = "buttons-acctions"
                        }}>
                            <span>{i+1}</span>
                            <span>{customer.name}</span>
                            <Circle status={customer.visited}/>
                        </div>
                        </div>
                    ))
                    :
                    <p>Nada para mostrar hoy.</p>}
                </div>
                <div className="footer-info">
                    <div className="info-circle">
                        <div className="circle-item" style={{backgroundColor: '#52c41a'}}/>
                        <p>Visitado</p>
                    </div>
                    <div className="info-circle">
                        <div className="circle-item" style={{backgroundColor: '#faad14'}}/>
                        <p>Más tarde</p>
                    </div>
                    <div className="info-circle">
                        <div className="circle-item" style={{backgroundColor: '#f5222d'}}/>
                        <p>Sin visita</p>
                    </div>
                </div>
            </div>
        );
    }
} 