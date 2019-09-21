import React, { Component } from 'react'
import './loans_list.scss'
import ProgressBar from './ProgressBar'
import firebase from 'firebase'
class LoansList extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            percentage: 40
        }
    }
    componentDidMount = () => {
        firebase.firestore().collection('loan').orderBy('Num_Prestamo')
            .onSnapshot((dates)=>{
            let Loans = []
            dates.forEach(date=>{
                let dato = date.data()
                Loans.push(dato)
            })
            console.log(Loans)
            this.setState({list: Loans})
        })
    }
    render(){
        return(
            <div className="detail">
            <div className="head">
                    <p className="client-name">{this.state.list.prestamo}</p>
           </div>
           { this.state.list.length > 0 ? this.state.list.map((loan, i)=>(
               <button className="btn-list" key={i}>
                    <span>{loan.Num_Prestamo}</span>
                    <span>{loan.Cliente}</span>
                    <span>{loan.Fecha}</span>
                    <div className="Progress"><ProgressBar percentage={this.state.percentage}/></div>
               </button>
           ))
            : <p>Cargando..</p>
            }
            </div>
        )
    }
}

export default LoansList