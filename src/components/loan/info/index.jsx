import React, { Component } from 'react'
import { Progress } from 'antd'
import arrow from './../../../assets/icons/left-arrow.svg'
import './index.scss'
import Information from './Information'
export default class Info extends Component {
    constructor(props){
        super(props)
        this.state = {
            datesLoan: this.props.location.state,
            returnDates: this.props.location.state.loans
        }
    }
    render() {
        const {fechaInicio, fechaFin, cantidad, pago, restante} = this.state.datesLoan
        var percentage = (pago*100)/cantidad
        var valuePersentage
        if (percentage % 1 === 0) {
            valuePersentage = parseInt(percentage)
        } else {
            valuePersentage = parseFloat(percentage.toFixed(1)) 
        }
        return (
            <div className="content-info-loan">
               <img onClick={()=> window.history.back()} src={arrow} className="img-arrow-back" alt="arrow"/>
                <p className="tittle-info-loan">Info</p>
                {percentage < 100 ?
                <div>
                    <p className="info-progress-p">Progreso del préstamo</p>
                    <Progress type="circle" percent={valuePersentage} style={{display: 'flex', justifyContent: 'center'}} />
                    <div className="info-p-container">
                        <span className="s-info-fecha">{fechaInicio} - {fechaFin}</span>
                        <div className="container-list-payments">
                            <p className="sub-list-pay">Lista de pagos</p>
                            { this.props.location.state.payments.length > 0 ? this.props.location.state.payments.map((payment, i)=>(
                                <div className="btn-list-info" key={i}>
                                        <span>{i+1}</span>
                                        <span>${payment.amount} MXN</span>
                                </div>
                                ))
                                : null
                                }
                        </div> 
                        <p className="info-progress-p">El préstamo fue: <span className="s-info">${cantidad}</span></p>
                        <p className="info-progress-p">Cantidad pagada: <span className="s-info">${pago}</span></p>
                        <p className="info-progress-p">Cantidad restante: <span className="s-info">${restante}</span></p>
                    </div>
                       
                </div>
                : 
                <Information dateEnd={fechaFin} dateInit={fechaInicio} cantidad={cantidad} pago={pago} restante={restante} />}
            </div>
        )
    }
}
