import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './new_loan.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import plus from '../../../assets/icons/plus.svg'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import Loader from './../../common/loader/loader'

class NewLoan extends Component {
    constructor(props){
        super(props)
        this.state = {
            loansLength: 1,
            client: null,
            customerNames:[],
            Loan: {
                total: 0,
                utility: 0,
                amountLoan: 0,
                payForDay: 0,
                deleted: false,
                loanRef: "",
                dateStart: "",
                dateEnd: "",
                payed: 0,
                remaining: 0,
                payments: [],
                created: firebase.firestore.Timestamp.fromDate(new Date()),
                updated: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            plazo: "20",
            dateId: "",
            ArrayLoans: [],
            date: null,
            limit: null,
            days: [15, 18, 20, 24, 30],
            active: false,
            select: false,
            loader: false
        }
    }

    date = () =>{
        let { date } = this.state
        let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
        let months = [ 'Enero', 'Febrero', 'Merzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

        let thisDate = new Date()
        date = `${days[thisDate.getDay()]} ${thisDate.getDate()} ${months[thisDate.getMonth()]} ${thisDate.getFullYear()}`
        
        var dateFormat = thisDate.getDate()+"/"+(thisDate.getMonth()+1)+"/"+thisDate.getFullYear()
        
        var codeLoan = thisDate.getFullYear().toString()+thisDate.getMonth().toString()+thisDate.getDate().toString()
        + thisDate.getHours().toString()+thisDate.getMinutes().toString()+thisDate.getSeconds().toString()+thisDate.getMilliseconds().toString()
        
        let { Loan } = this.state
        Loan.dateStart = dateFormat
        Loan.loanRef = codeLoan
        this.setState(Loan)

        this.setState({ date })
    }

    selectClient = () =>{
        let { active } = this.state
        active = !active
        this.setState({ active })
    }
    inputClient = (i, id) =>{
        let select = document.getElementsByClassName(`opn${i}`)[0]
        let space = document.getElementsByClassName(`space`)[0]

        space.innerText = select.innerText


        firebase.firestore().collection('Customers').doc(id)
        .onSnapshot((customer)=>{
            if (customer.data().loans !== undefined){
                this.setState({ArrayLoans: customer.data().loans})
            }
            console.log(this.state.ArrayLoans)             
        })
        this.setState({dateId: id})
        this.selectClient()
    }

    selectNumer = () =>{
        let { select } = this.state
        let number = document.getElementsByClassName('number-limit')[0].innerText;

        select = !select

        if( select ){
            let selector = document.getElementsByClassName(`numbers-container`)[0]
            let alloptions = document.getElementsByClassName(`number-option`)
            let option = document.getElementById(`n${number}`)
            for(let i = 0; i < alloptions.length; i++){
                alloptions[i].style.color="#000"
            }
            try{
                setTimeout(()=>{
                    option.style.color="#0ac8e5"
                    selector.scrollTo(0,40*(number-1))
                }, 0)
            }catch(e){
                alert(e)
            }
        }
        this.setState({ select })
    }
    inputNumber = (day) =>{
        let select = document.getElementById(`n${day}`)
        let space = document.getElementsByClassName(`number-limit`)[0]
        let options = document.getElementsByClassName(`number-option`)
        for(let i = 0; i < options.length; i++){
            options[i].style.color = "#000"
        }

        select.style.color = "#0ac8e5"

        space.innerText = select.innerText

        if(parseInt(select.innerText) === 18){
            let { Loan } = this.state
            Loan.amountLoan = 1500
            Loan.payForDay = (1500*1.2)/select.innerText
            this.setState(Loan)
            document.getElementById('input-cantidad').disabled = true
            
        } else {
            let { Loan } = this.state
            Loan.amountLoan = 0
            Loan.payForDay = (Loan.amountLoan*1.2)/select.innerText
            this.setState(Loan)
            document.getElementById('input-cantidad').disabled = false
        }
        
        this.setState({plazo: select.innerText})
        

    }

    componentDidMount = () =>{
        this.date()
        firebase.firestore().collection('Customers').where("deleted", "==", false)
            .onSnapshot((customers)=>{
            let names = []
            let Loans = []
            customers.forEach(date=>{
                let dato = date.data()
                dato.id = date.id
                names.push(dato)
                let loan = date.data().loans
                Loans.push(loan)
            })
            var NumLoans = 0
            Loans.forEach(loan=>{
                if(loan !== undefined){
                    NumLoans+= loan.length
                }
            })

            this.setState({customerNames: names, loansLength: NumLoans+1})
        }) 
    }

    changeCant = (e) => {
        let { Loan } = this.state
        Loan.amountLoan = parseInt(e.target.value)
        Loan.payForDay = (Loan.amountLoan*1.2)/this.state.plazo
        this.setState(Loan)
    }

    Register = () => {
        if(this.state.Loan.amountLoan === 0){
            toast.error("Proporcione la cantidad del préstamo.")
        } else {
        var newDate = new Date()
        var range = parseInt(this.state.plazo)
        newDate.setDate(newDate.getDate() + range) 
        var newDay = newDate.getDate()
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var newFecha = newDay+"/"+newMonth+"/"+newYear
        var more  = this.state.Loan.amountLoan * 0.2
        var AsingTotal = this.state.Loan.amountLoan * 1.2
        let { Loan } = this.state
        Loan.dateEnd = newFecha
        Loan.utility = more
        Loan.total = AsingTotal
        this.setState(Loan)
        console.log(this.state.Loan)

        var id = this.state.dateId
        var loans = this.state.ArrayLoans
        loans.push(this.state.Loan)
        console.log(loans)
        firebase.firestore().collection('Customers').doc(id).update({loans})
        .then(()=>{
            toast.info("Préstamo registrado!")
            this.props.history.push({
                pathname: '/prestamos/lista/',
                state: {
                    id: id,
                }
            })
        })
        .catch((err)=>{
            toast.error("No se pudo registrar el présatmo.")
            console.log(err)
        })
        var container = document.getElementById('btn-add-loan')
        container.disabled = true
        container.className = "btn-not-active"
        this.setState({loader: true})
        }
    }

    render(){
        return(
            <div className="new-loan-container">
                <img src={arrow} onClick={()=> window.history.back()} className="img-arrow-back" alt="arrow"/>
                <p className="new-loan-title">Nuevo Prestamo</p>
                <span className="loan-number">{this.state.loansLength != null ?
                `#${this.state.loansLength}`
                :
                null}</span>
                <div className="data-container">
                    <span>Cliente</span>
                    <div 
                    className="select-customer">
                        <p
                        className={`space ${this.state.active === false ? "not-active" : "active" }`}
                        onClick={ () => this.selectClient() }>{ this.state.client != null ?
                        this.state.client
                        :
                        null }</p>
                        <img
                         src={ arrow }
                         alt="desplegar"
                         className={`view-button ${this.state.active === false ? "not-active" : "active" }`}
                         onClick={ () => this.selectClient() } />
                        <NavLink to="/clientes/nuevo/"><img src={ plus } alt="agregar" className="add-button"/></NavLink>
                        <div
                        style={{
                            overflowY : this.state.customerNames.length >= 6 ? 'scroll' : 'hidden'
                        }}
                        className={`options-container ${this.state.active === false ? "not-active" : "active" }`}>
                            { this.state.customerNames.length > 0 ?
                            this.state.customerNames.map((customer, i)=>(
                                <p key={i}
                                className={`option opn${i}`}
                                onClick={()=>this.inputClient(i, customer.id)}>{customer.firstName} {customer.lastName}</p>
                            ))
                            :
                            null }
                        </div>
                    </div>
                    <span>Cantidad</span>
                    <input type="number" 
                    placeholder="$"
                    className="input-cant"
                    id="input-cantidad"
                    onChange={(e)=>this.changeCant(e)} 
                    value={this.state.Loan.amountLoan || ""}/>
                    <span className="date-container">{ this.state.date != null ?
                    this.state.date
                    :
                    null }</span>
                    <div className="limit">
                        <span>Plazo</span>
                        <div className="choiseDay"
                        onClick = {()=>this.selectNumer()} >
                            <p 
                            className={`number-limit ${this.state.select ? 'active' : 'not-active'}`}>
                            { this.state.limit != null ?
                            this.state.limit
                            :
                            '20' }</p>
                            <div
                            className={`numbers-container ${this.state.select ? 'active' : 'not-active'}`} >
                                {this.state.days.map((day, i)=>(
                                    <span
                                    key={i}
                                    className='number-option'
                                    id={`n${day}`}
                                    onClick={()=>this.inputNumber(day)}>
                                    {`${day}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <span>Días</span>
                    </div>
                    <p className="p-info-cantidad">Cantidad a pagar por día: ${this.state.Loan.payForDay > 0 ? this.state.Loan.payForDay : 0}</p>
                    <button className="add-loan-button" id="btn-add-loan" onClick={this.Register}>Agregar</button>
                    {this.state.loader === true ? <Loader/> : null}
                </div>
            </div>
        )
    }
}

export default NewLoan