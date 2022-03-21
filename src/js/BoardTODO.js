import React from 'react';
import {TodoFragment} from './Fragment';

export class BoardTODO extends React.Component{
    render(){
        return(
            <div className="container">
                <h3>TODO</h3>
                <TodoFragment/>
            </div>
        )
    }
}