import React from 'react'
import { Progress } from 'antd'
import './index.scss'
const InfoLoan = (props) =>{
        return (
            <div className="content-info-loan">
                <div>
                    <p className="info-progress-p">¡Prestamo pagado!</p>
                    <Progress type="circle" percent={100} style={{display: 'flex', justifyContent: 'center'}}/>
                    <div className="info-p-container">
                        <span className="s-info-fecha">{props.dateInit} - {props.dateEnd}</span>
                        <p className="info-progress-p">El préstamo fue: <span className="s-info">${props.prestamo}</span></p>
                        <p className="info-progress-p">Cantidad total: <span className="s-info">${props.cantidad}</span></p>        
                        <p className="info-progress-p">Cantidad pagada: <span className="s-info">${props.pago}</span></p>
                        <p className="info-progress-p">Cantidad restante: <span className="s-info">${props.restante}</span></p>
                        <p className="info-progress-p">Ganancia: <span className="s-info">${props.utilidad}</span></p>
                    </div>
                </div>
            </div>
        )
}
export default InfoLoan