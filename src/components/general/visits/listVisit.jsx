import React, { Component } from 'react'
import './index.scss'
import firebase from 'firebase' 
import {toast} from 'react-toastify'
import Circle from './status'
import Refresh from './../../../assets/icons/refresh.svg'
import Go from './../../../assets/icons/paper-plane.svg'
import arrow from './../../../assets/icons/chevron-upwards-arrow.svg'
export default class Visits extends Component {
    constructor(props){
        super(props)
        this.state = {
            customers:[],
            customersNotLoan: [],
            num: 0,
            position: null,
            Gral: [],
            datesLoan: {
                id: ""
            },
            key: "",
        }
    }

    componentDidMount = () =>{
        var date = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()
        firebase.firestore().collection('Visits')
            .onSnapshot((dates)=>{
            let visits = []
            let dato = null
            dates.forEach(date=>{
                dato = date.data()
                dato.id = date.id
                dato.ListVisit = date.data().ListVisit
                localStorage.setItem("id", dato.id)
                visits.push(dato)
            })
            var list = []
            if(dato.ListVisit) dato.ListVisit.forEach(dataList=> list.push(dataList))
            var CustomersWithLoan = []
            var CustomersNotLoan = []
            list.forEach(listItem=>{
                var ref = listItem.ref
                ref.get().then(dataCustomer => {
                    var data = dataCustomer.data()
                    var loans = data.loans
                    if(loans){
                        loans.forEach(loan =>{
                            var payments = loan.payments
                            if(payments.length>0){
                                payments.forEach(pay=>{
                                    if(parseInt(listItem.visited) !== 0){
                                        if(date === pay.date){
                                            listItem.visited = true
                                        }
                                        else{
                                            listItem.visited = false
                                        }
                                    }
                                })
                            }else{
                                if(parseInt(listItem.visited) !== 0){
                                listItem.visited = false
                                }
                            }
                        })
                        CustomersWithLoan.push(listItem)
                    } else{
                        CustomersNotLoan.push(listItem)
                    }
                    this.setState({customers: CustomersWithLoan, customersNotLoan: CustomersNotLoan})
                })
            })
        })
    }

    Detail = (e,id,) => {
        let {datesLoan} = this.state
        datesLoan.id = id
        this.setState(datesLoan)
        console.log(id)
            this.props.history.push({
                pathname: '/prestamos/lista/',
                state: this.state.datesLoan
            })
    }
    ComeBack = (id) =>{
        var key = localStorage.getItem("id")
        var ListVisit = this.state.customers
        this.state.customersNotLoan.forEach(NotLoan=>ListVisit.push(NotLoan))
        ListVisit.forEach(data=>{
            if(data.uid === id){
                data.visited = 0
            }
        })
        firebase.firestore().collection("Visits").doc(key).update({ListVisit})
        .then(()=>{
            toast.warn("Vuelve más tarde!")
        }).catch(err=>{
            toast.error("Ups, hubo un error.")
            console.log(err)
        })
    }
    more = () =>{
        var cont
        if(this.state.num-1<0){
            cont=0
        }else{
            cont= this.state.num-1
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
        var click=this.state.num-2,n,p
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
        var key = localStorage.getItem("id")
        var ListVisit = this.state.customers
        this.state.customersNotLoan.forEach(NotLoan=>ListVisit.push(NotLoan))
        firebase.firestore().collection("Visits").doc(key).update({ListVisit})
        .then(()=>{
            toast.success("Visitas ordenadas!")
        }).catch(err=>{
            toast.error("Error al ordenar visiitas, inténtelo más tarde.")
            console.log(err)
        })
        document.getElementById('buttons-container').className = "buttons-not"
        document.getElementById(this.state.position).className = "visit-container"
    }
    render(){
        let numbersInList = []
        for(var i=0; i<this.state.customers.length; i++){
            numbersInList.push(i)
        }
        return(
            <div className="general-loans-container">
                <p className="customers-loans-title">Visitas
                </p>
                <div className="buttons-not" id="buttons-container">
                    {this.state.position===0 ? null :
                    <img src={arrow} alt="arrow" className="img-one-btn" onClick={this.back}/>
                    }
                    <img src={arrow} alt="arrow" className="img-two-btn" onClick={this.more}/>
                    <button className="btn-save" onClick={this.save}>Guardar</button>
                </div>
                <div className="visit">
                    {this.state.customers.length > 0 ?
                    this.state.customers.map((customer, i)=>(
                        <div className="visit-container-gral" key={i}>
                        <div className="visit-container" id={i}
                        onClick={() => {
                            this.setState({position: i, num: i+1, numM: i-1})
                            numbersInList.forEach(n=>{
                                if(n!==i){
                                    document.getElementById(n).className = "visit-container"
                                }else{
                                    document.getElementById(i).className = "visit-select"
                                }
                            })
                            document.getElementById('buttons-container').className = "buttons-acctions"
                        }}>
                            <span>{i+1}</span>
                            <span>{customer.name}</span>
                            <Circle status={customer.visited}/>
                        </div>
                        <img onClick={()=>this.ComeBack(customer.uid)} src={Refresh} alt="Regresar"/>
                        <img onClick={(e) => this.Detail(e, customer.uid)} src={Go} alt="Vamos"/>
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
        )
    }
} 