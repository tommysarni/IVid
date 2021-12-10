import React from "react";

class DotGrid extends React.Component {
    render(){
        return (
            <iframe style={{width: '300px', height: '300px', border: 'none'}} src={'./dotGrid.html'}/>   /* like this */
        );
    }
}
export default DotGrid;