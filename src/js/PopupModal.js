import React from 'react';

export class PopupModal extends React.Component{
    render(){
        return(
            <div className="popup" >
                <div id="myModal" className="moodal">
                    <div className="modal-content">
                        <span className="close">&times;</span>
                        <p>Title new name:</p>
                        <input type="text"></input>
                    <button>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}