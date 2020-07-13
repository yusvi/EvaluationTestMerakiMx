import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
                <Navbar.Collapse id="basic--navbar-bar">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/products">Products</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/customers">Customers</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/orders">Orders</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>
        )
    }
}