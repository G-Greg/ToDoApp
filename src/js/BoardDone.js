import React from 'react';
import {TodoFragment} from './Fragment';

export class BoardDone extends React.Component{
    render(){
        return(
            <div className="container">
                <h3>Done</h3>
                <TodoFragment/>
            </div>
        )
    }
}