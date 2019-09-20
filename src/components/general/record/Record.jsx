import React, { Component } from 'react'
import './record.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import firebase from 'firebase'
class Record extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            day: 1,
            actualDay: 1,
        }
    }
    componentDidMount = () =>{
        firebase.firestore().collection('customers')
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
            <div className="general-record-container">
                <img src={ arrow } alt="anterior" className="arrows"/>
                {this.state.day === this.state.actualDay ? 
                null
                :
                <img src={ arrow } alt="siguiente" className="arrows"/>}

                <p className="header-general-record">Historial</p>
                <span className="subtitle-general-record">
                {this.state.day === this.state.actualDay ? 
                'Hoy'
                :
                `${this.state.day}`}
                </span>
                <div className="customers-name-container">
                    { this.state.customers.length > 0 ?
                    this.state.customers.map((customer)=>(
                        <span>{ customer.Nombre }</span>
                    ))
                    :
                    <p>No hay datos para mostrar.</p> }
                </div>
            </div>
        )
    }
}

export default Record