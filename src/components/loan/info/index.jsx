import React, { Component } from 'react'
import { Progress } from 'antd'
import './index.scss'
export default class Info extends Component {
    constructor(props){
        super(props)
        this.state = {
            datesLoan: this.props.location.state
        }
    }
    render() {
        const {fechaInicio, fechaFin, Cantidad, pago, percentage} = this.state.datesLoan
        var restant = Cantidad - pago
        var valuePersentage
        if (percentage % 1 === 0) {
            valuePersentage = parseInt(percentage)
        } else {
            valuePersentage = parseFloat(percentage.toFixed(1)) 
        }
        return (
            <div className="content-info-loan">
                <p className="tittle-info-loan">Info</p>
                {percentage < 100 ?
                <div>
                    <p className="info-progress-p">Pregreso del prestamo</p>
                    <Progress type="circle" percent={valuePersentage} />
                    <div className="info-p-container">
                        <span className="s-info-fecha">{fechaInicio} - {fechaFin}</span>
                        <p className="info-progress-p">El prestamo fue: <span className="s-info">${Cantidad}</span></p>
                        <p className="info-progress-p">Cantidad pagada: <span className="s-info">${pago}</span></p>
                        <p className="info-progress-p">Cantidad restante: <span className="s-info">${restant}</span></p>
                    </div>
                </div>
                : 
                <div>
                    <p className="info-progress-p">¡Prestamo pagado!</p>
                    <Progress type="circle" percent={100} />
                    <div className="info-p-container">
                        <span className="s-info-fecha">{fechaInicio} - {fechaFin}</span>
                        <p className="info-progress-p">El prestamo fue: <span className="s-info">${Cantidad}</span></p>
                        <p className="info-progress-p">Cantidad pagada: <span className="s-info">${pago}</span></p>
                        <p className="info-progress-p">Cantidad restante: <span className="s-info">${restant}</span></p>
                    </div>
                </div>}
            </div>
        )
    }
}
