import React, { Component } from 'react'
import firebase from 'firebase'
import './../record.scss'

export default class DetailRecord extends Component {
    constructor(props){
        super(props)
        this.state = {
            dateForCustomer: "",
            NumCustomer: 0
        }
    }
    componentDidMount = () =>{
        firebase.firestore().collection("loan")
        .where("Cliente", "==", this.props.location.state.Nombre)
        .onSnapshot((dates)=>{
            let Custmer = []
            dates.forEach(date=>{
                let dato = date.data()
                Custmer.push(dato)
            })
            this.setState({dateForCustomer: Custmer})
            this.setState({NumCustomer: Custmer.length})
        })
    }
    render() {
        const {Nombre, pago, fecha, num} = this.props.location.state
        return (
            <div>
                <div className="detail">
                <p className="head-record-detail">Detalle</p>
                    <div className="client-data">
                        <p>No. Pago: {num}</p>
                        <p>Cliente: {Nombre}</p>
                        <p>Pago: {pago} MXN</p>
                        <p>Fecha: {fecha}</p>
                    </div>
                </div>
            </div>
        )
    }
}
