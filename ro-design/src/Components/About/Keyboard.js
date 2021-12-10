import React from "react";

class Keyboard extends React.Component {
    render(){
        return (
            <iframe style={{width: '600px', height: '300px', border: 'none', marginLeft: '-120px', marginRight: '-120px'}} src={'./keyboard.html'}/>   /* like this */
        );
    }
}
export default Keyboard;