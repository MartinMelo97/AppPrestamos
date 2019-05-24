import React, { Component } from 'react'
import 'antd/dist/antd.css'
import '/Today.css'
import { Button, Radio, Icon } from 'antd';

class Today extends Component {
        render(){
            return (
                <div>
                    <nav class="navbar">
                    <ul class="lista"> 
                    <li><a><Icon type="left" style={{color: "#000"}} /></a></li>
                    <li>HOY </li>
                    <li><a><Icon type="right" style={{color: "#000"}} /></a></li>
                    </ul>
                    </nav>
                     
                    <center>
                    
                    <Button 
                    className="btn-today-one"
                    shape="round" size="large"               
                    // onClick={} 
                    >  <span className="space-span">Alicia</span><span className="style-cant">$500</span> </Button>
                    
                    <Button 
                    className="btn-today-one"
                    shape="round" size="large"               
                    // onClick={} 
                    > <span className="space-span">Juan</span><span className="style-cant"> $200</span> </Button>
                    
                    <Button 
                    className="btn-today-one"
                    shape="round" size="large"               
                    // onClick={} 
                    >  <span className="space-span">Ray</span><span className="style-cant">$50</span> </Button>
                    
                    <Button 
                    className="btn-today-one"
                    shape="round" size="large"               
                    // onClick={} 
                    > <span className="space-span">Montse</span><span className="style-cant">$25</span> </Button>
                    
                    <Button 
                    className="btn-today-one"
                    shape="round" size="large"               
                    // onClick={} 
                    ><span className="space-span">Gabriel</span><span className="style-cant">$50</span> </Button>
                    
                    
                    
                    </center>
                     
                </div>
            ) 
        }
    }

 

export default Today;