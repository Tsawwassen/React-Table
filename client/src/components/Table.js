import React, { Component } from 'react';




class Table extends Component {
    
  constructor(props){
    super(props);
    this.state = {
        table:[]

    }
    console.log("hello");
  }

  componentDidMount(){
    fetch('/api/table')
    .then(res => res.json())
     .then(data => {
       console.log(data);
       //this.setState(table:data.table)
     });
    
  }


  render () {
    return (
      <h3>Table Component</h3>
      
    );
  }
}

export default Table;