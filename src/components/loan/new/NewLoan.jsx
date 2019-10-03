import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './new_loan.scss'
import arrow from '../../../assets/icons/left-arrow.svg'
import plus from '../../../assets/icons/plus.svg'
import firebase from 'firebase'
import { toast } from 'react-toastify'

class NewLoan extends Component {
    constructor(props){
        super(props)
        this.state = {
            loansLength: 1,
            client: null,
            customerNames:[],
            Loan: {
                Cliente: "No user",
                Cantidad: "",
                Plazo: "20",
                Num_Prestamo: "",
                fechaInicio: "",
                fechaFin: "",
                Year: "",
                diaInicio: "",
                diaFin: "",
                mesInicio: "",
                mesFin: "",
                numPay: 0,
                pago: 0,
                percentage: 0,
            },
            date: null,
            limit: null,
            days: [],
            active: false,
            select: false,
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
        
        var newDate = new Date()
        var range = parseInt(this.state.Loan.Plazo)
        newDate.setDate(newDate.getDate() + range) 
        var newDay = newDate.getDate()
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var newFecha = newDay+"/"+newMonth+"/"+newYear
        
        let { Loan } = this.state
        Loan.fechaInicio = dateFormat
        Loan.diaInicio = thisDate.getDate()
        Loan.mesInicio = thisDate.getMonth()+1
        Loan.Year = thisDate.getFullYear()
        Loan.Num_Prestamo = codeLoan
        Loan.diaFin = newDay
        Loan.mesFin= newMonth
        Loan.fechaFin= newFecha
        this.setState(Loan)

        this.setState({ date })
    }

    selectClient = () =>{
        let { active } = this.state
        active = !active
        this.setState({ active })
    }
    inputClient = (i) =>{
        let select = document.getElementsByClassName(`opn${i}`)[0]
        let space = document.getElementsByClassName(`space`)[0]

        space.innerText = select.innerText

        let { Loan } = this.state
        Loan.Cliente = select.innerText
        this.setState(Loan)
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
        console.log("State el num " + this.state.limit)
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

        let { Loan } = this.state
        Loan.Plazo = select.innerText
        this.setState(Loan)

        var newDate = new Date()
        var range = parseInt(this.state.Loan.Plazo)
        newDate.setDate(newDate.getDate() + range) 
        var newDay = newDate.getDate()
        var newMonth = newDate.getMonth()+1
        var newYear = newDate.getFullYear()
        var newFecha = newDay+"/"+newMonth+"/"+newYear
        
        Loan.diaFin = newDay
        Loan.mesFin= newMonth
        Loan.fechaFin= newFecha 
        this.setState(Loan)
    }

    componentDidMount = () =>{
        this.date()
        let { days } = this.state
        for(let i = 1; i < 51; i++){
            days.push(i)
        }
        this.setState({ days })

        firebase.firestore().collection('loan')
            .onSnapshot((dates)=>{
            let num = []
            dates.forEach(date=>{
                let dato = date.data()
                num.push(dato)
            })
            this.setState({loansLength: num.length+1})
            
        })

        firebase.firestore().collection('customers')
            .onSnapshot((dates)=>{
            let names = []
            dates.forEach(date=>{
                let dato = date.data().Nombre
                names.push(dato)
            })
            this.setState({customerNames: names})
        })
    }

    changeCant = (e) => {
        let { Loan } = this.state
        Loan.Cantidad = parseInt(e.target.value)
        this.setState(Loan)
    }

    Register = () => {
        console.log(this.state.Loan)
        firebase.firestore().collection('loan').add(this.state.Loan)
        .then(()=>{
            toast.info("Préstamo registrado!")
            let {Loan} = this.state
            Loan.Cantidad = ""
            this.setState(Loan)
            this.setState({client: ""})
            this.setState({limit: '20'})
        })
        .catch((err)=>{
            toast.error("No se pudo registrar el présatmo")
            console.log(err)
        })
    }

    render(){
        return(
            <div className="new-loan-container">
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
                            this.state.customerNames.map((name, i)=>(
                                <p key={i}
                                className={`option opn${i}`}
                                onClick={()=>this.inputClient(i)}>{ name }</p>
                            ))
                            :
                            null }
                        </div>
                    </div>
                    <span>Cantidad</span>
                    <input type="number" 
                    placeholder="$"
                    className="input-cant"
                    onChange={(e)=>this.changeCant(e)} 
                    value={this.state.Loan.Cantidad || ""}/>
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
                    <button className="add-loan-button" onClick={this.Register}>Agregar</button>
                </div>
            </div>
        )
    }
}

export default NewLoan