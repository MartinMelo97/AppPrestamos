import React from 'react'
import { Progress } from 'antd'
import './index.scss'
const Info = (props) =>  {
        const {cantidad, pago, restante, payments} = props
        var percentage = (pago*100)/cantidad
        var valuePersentage
        if (percentage % 1 === 0) {
            valuePersentage = parseInt(percentage)
        } else {
            valuePersentage = parseFloat(percentage.toFixed(1)) 
        }
        return (
            <div className="content-info-loan">
                <div>
                    <p className="info-progress-p">Progreso del préstamo</p>
                    <Progress type="circle" percent={valuePersentage} style={{display: 'flex', justifyContent: 'center'}} />
                    <div className="info-p-container">
                        <div className="container-list-payments">
                            <p className="sub-list-pay">Lista de pagos</p>
                            { payments.length > 0 ? payments.map((payment, i)=>(
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
                </div>
        )
}

export default Info