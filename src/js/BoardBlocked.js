import React from 'react';
import {TodoFragment} from './Fragment';

export class BoardBlocked extends React.Component{
    render(){
        return(
            <div className="container">
                <h3>Blocked</h3>
                <TodoFragment/>
            </div>
        )
    }
}