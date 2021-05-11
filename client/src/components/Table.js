import React, { Component } from 'react';

class Table extends Component {
    
  constructor(props){
    super(props);
    this.state = {
        table:[],
        headers:[],
        readOnly: [[]]

    }

    this.testButton = this.testButton.bind(this);
    this.displayHeader = this.displayHeader.bind(this);
    this.fillTable = this.fillTable.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
    this.cellChanged = this.cellChanged.bind(this);
  }
  /* Helper function to remove _id key */
  removeIDKey(item){
    //console.log(`inside removeIDKEy function ${array}`);
    let t_headers = Object.keys(item);
    t_headers.shift();
    return t_headers;
  }

  /** Populate State variables */
  componentDidMount(){
    fetch('/api/table')
    .then(res => res.json())
     .then(data => {
       let t = data.data;
       let h = this.removeIDKey(data.data[0]);
       let rO = this.createReadOnlyTable(h.length, t.length);
       
       this.setState( {table:t, headers: h, readOnly:rO} );
     });
    
  }

  /** Helper function to create Read Only table */
  createReadOnlyTable(col, rows){
    let t_table = [];
    for(let i = 0 ; i < rows ; i++){
      t_table[i] = new Array(col);
      t_table[i].fill(true);
    }
    return t_table;
  }

  /** Button used for testing */
  testButton(){
    console.table(this.state.table);
    //console.log(this.state.headers);
    
  }

  /** Fill Headers */
  displayHeader(header, index){
    return (<th key={index}>{header}</th>)
  }

  /** Fill Table */
  fillTable(data, indexRow){
    return(<tr key={indexRow}> 
            {this.state.headers.map ( (objKey, indexCol) => { 
              //return (<td key={index} onClick={this.cellClicked}>{data[objKey]}</td>) 
              //console.log(`inside fill table, row ${indexRow} col ${indexCol}`);
              //console.log(this.state.readOnly[0][0]);
              return (<td key={`${indexCol}, ${indexRow}`}>
                        <input id={`${indexRow},${indexCol}`} 
                        readOnly={this.state.readOnly[indexRow][indexCol]} 
                        value={data[objKey]} //BUG, Need to update onChange to have the field update
                        onClick={this.cellClicked}
                        onChange={this.cellChanged}
                        type="text" />
                      </td>)
            })}
          </tr>);
  }

  /** Handle cell clicked */
  cellClicked(event){
    let t_rO = this.state.readOnly;
    t_rO[event.target.id[0]][event.target.id[2]] = false;
    this.setState({readOnly:t_rO});
  }

  /** Handle cell cahnges */
  cellChanged(event){
    let t_value = event.target.value;
    let index = event.target.id;
    let t_table = this.state.table;
    t_table[event.target.id[0]][this.state.headers[index[2]]] = t_value;
    this.setState({table : t_table});
  }

  render () {
    return (
      <div className="container">
        <h3>Table Component</h3>
        <table className="table">
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