import React, { Component } from 'react'
import { Progress } from 'antd'
import './index.scss'
export default class Info extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            percentage: 40
        }
    }
    render() {
        return (
            <div className="content-info-loan">
                <p className="tittle-info-loan">Info</p>
                {this.state.percentage < 100 ?
                <div>
                    <p className="info-progress-p">Pregreso del prestamo</p>
                    <Progress type="circle" percent={this.state.percentage} />
                    <span className="s-info">-</span>
                    <p className="info-progress-p">El prestamo fue: <span className="s-info"></span></p>
                    <p className="info-progress-p">Cantidad pagada: <span className="s-info"></span></p>
                    <p className="info-progress-p">Cantidad restante: <span className="s-info"></span></p>
                </div>
                : 
                <div>
                <p>El pago ha sido completado</p>
                <Progress type="circle" percent={100} />
                <p>-</p>
                <p>El prestamo fue:</p>
                <p>Cantidad pagada:</p>
                <p>Cantidad restante:</p>
            </div>}
            </div>
        )
    }
}
