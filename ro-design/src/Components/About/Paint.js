import React from "react";

class Paint extends React.Component {
    render(){
        return (
            <iframe style={{width: '300px', height: '300px', border: 'none'}} src={'./paint.html'}/>   /* like this */
        );
    }
}
export default Paint;