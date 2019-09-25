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

    goInfo = () => {
        this.props.history.push({
            pathname: '/dashboard/info'
        })
    }

    render(){
        return(
            <div className="detail">
            <div className="head">
                    <p className="client-name">{this.state.list.prestamo}</p>
           </div>
           { this.state.list.length > 0 ? this.state.list.map((loan, i)=>(
               <div className="btn-list" key={i} onClick={() => this.goInfo()}>
                    <span>{i+1}</span>
                    <span>{loan.Cliente}</span>
                    <span>{loan.fechaInicio}</span>
                    <div className="Progress"><ProgressBar percentage={this.state.percentage}/></div>
               </div>
           ))
            : <p>Cargando..</p>
            }
            </div>
        )
    }
}

export default LoansList