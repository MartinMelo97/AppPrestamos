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
                        <p className="info-progress-p">Duración del préstamo: <span className="s-info">{props.dias} días</span></p> 
                        <p className="info-progress-p">Monto prestado: <span className="s-info">${props.prestamo}</span></p>
                        <p className="info-progress-p">Ganancia (20%): <span className="s-info">${props.utilidad}</span></p>
                        <p className="info-progress-p">Total pagado: <span className="s-info">${props.cantidad}</span></p>
                    </div>
                </div>
            </div>
        )
}
export default InfoLoan