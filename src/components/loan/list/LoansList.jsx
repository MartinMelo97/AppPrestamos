import React, { Component } from 'react'
import './loans_list.scss'
import ProgressBar from './ProgressBar'

class LoansList extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            
            list:{
                num: 1,
                name:'Alicia',
                fecha: '18/06/2019', 
                prestamo: 'Prestamos',
                percentage: 100,
            }, 
            listTwo:{
                num: 2,
                name:'Isaac',
                fecha: '20/06/2019', 
                prestamo: 'Prestamos',
                percentage: 50,
            } 
             
        }
       
    }
    
    render(){
        return(
            <div className="detail">
            <div className="head">
                    <p className="client-name">{this.state.list.prestamo}</p>
           </div>
               
           <button className="btn-list">
                    <span>{this.state.list.num}</span>
                    <span>{this.state.list.name}</span>
                    <span>{this.state.list.fecha}</span>
                    <div className="Progress"><ProgressBar percentage={this.state.list.percentage}/></div>         
           </button> 
           <button className="btn-list">
                    <span>{this.state.listTwo.num}</span>
                    <span>{this.state.listTwo.name}</span>
                    <span>{this.state.listTwo.fecha}</span>
                    <div className="Progress"><ProgressBar percentage={this.state.listTwo.percentage}/></div>         
           </button> 
          
        
        
        
            </div>
        )
    }
}

export default LoansList