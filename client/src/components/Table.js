import React, { Component } from 'react';




class Table extends Component {
    
  constructor(props){
    super(props);
    this.state = {
        

    }
    console.log("hello");
  }

  componentDidMount(){
    fetch('/api/')
    .then(res => res.json())
     .then(data => {
       console.log(data);
     });
    
  }


  render () {
    return (
      <h3>Table Component</h3>
      
    );
  }
}

export default Table;