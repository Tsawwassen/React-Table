import React, { Component } from 'react';
import './Table.css'; //Not the best styles for the table, but it will do




class Table extends Component {
    
  constructor(props){
    super(props);
    this.state = {
        table:[],
        headers:[]

    }

    this.testButton = this.testButton.bind(this);
    this.displayHeader = this.displayHeader.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }
  /* Helper function to remove _id key */
  removeIDKey(item){
    //console.log(`inside removeIDKEy function ${array}`);
    let t_headers = Object.keys(item);
    t_headers.shift();
    return t_headers;
  }

  componentDidMount(){
    fetch('/api/table')
    .then(res => res.json())
     .then(data => {
       this.setState( {table:data.data, headers: this.removeIDKey(data.data[0])} );
     });
    
  }

  testButton(){
    console.table(this.state.table);
    //console.log(this.state.headers);
  }
  /** Fill Headers */
  displayHeader(header, index){
    return (<th key={index}>{header}</th>)
  }
  
  /** Fill Table */
  fillTable(data, index){
    return(<tr key={index}> 
            {this.state.headers.map ( (objKey, index) => { return (<td key={index}>{data[objKey]}</td>) })}
          </tr>);
  }

  render () {
    return (
      <div>
        <h3>Table Component</h3>
        <table>
          <thead>
            <tr>
              {this.state.headers.map( (header, index) => this.displayHeader(header, index) )}
            </tr>
          </thead>
          <tbody>
            {this.state.table.map((data, index) => this.fillTable(data, index))}
          </tbody>
        </table>
        <button onClick={this.testButton}>Test Button</button>
      </div>
    );
  }
}

export default Table;