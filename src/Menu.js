import React from 'react';
import {NavLink} from 'react-router-dom';

class Menu extends React.Component{
    render(){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/nothome">
                    NotHome
                </NavLink>
            </div>
        )
    }
}
export default Menu