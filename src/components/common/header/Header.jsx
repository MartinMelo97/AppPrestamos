import React, { Component } from 'react'
import './header.scss'
import HamburgerMenu from './HamburgerMenu.jsx'
import MenuIcon from '../../../assets/icons/menu.svg'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day:null,
            user:null,
            options:[
                "Clientes",
                "Historial",
                "Corte del día",
                "Resumen Gral.",
                "Prestamos"
            ],
            active:null
        }
    }

    sidebar = () => {
        let { active } = this.state
        active === "active" ? 
        this.setState({active: null})
        :
        this.setState({active: "active"})
    }

    componentDidMount = () =>{
        let { day } = this.state
        let days = ["Dom.","Lun.", "Mar.", "Miér.", "Jue.", "Vier.", "Sáb."]
        let monts = ["Ener", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        let date = new Date()
        day = `${days[ date.getDay()]} ${date.getDate()} ${monts[date.getMonth()]}`
        this.setState({ day })
    }

    render(){
        return(
            <div className="header">
                <HamburgerMenu
                active={this.state.active}
                options={this.state.options}
                day={this.state.day}
                user={this.state.user}
                sidebar={this.sidebar}/> 

                <img src={ MenuIcon } alt="boton menú" onClick={this.sidebar} className="menu-icon"/>
                <p className="title">{this.state.day}</p>
            </div>
        )
    }
}

export default Header