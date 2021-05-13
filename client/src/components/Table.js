import React, { Component } from 'react';

class Table extends Component {
    
  constructor(props){
    super(props);
    this.state = {
        table:[],
        headers:[],
        readOnly: [[]],
        tempUpdateColumns: {}

    }

    this.testButton = this.testButton.bind(this);
    this.displayHeader = this.displayHeader.bind(this);
    this.fillTable = this.fillTable.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
    this.cellChanged = this.cellChanged.bind(this);
    this.updateColumnFields = this.updateColumnFields.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateColumnFieldChange = this.updateColumnFieldChange.bind(this);
    this.clearTempUpdateColumns = this.clearTempUpdateColumns.bind(this);
    this.createChangeObject = this.createChangeObject.bind(this);
  }

  /* Helper function to remove _id key */
  removeIDKey(item){
    //console.log(`inside removeIDKEy function ${array}`);
    let t_headers = Object.keys(item);
    t_headers.shift();
    return t_headers;
  }

  /** Helper function to create change object */
  createChangeObject(headers){
    let t_obj = {};
    headers.forEach(header => {
      t_obj[header] = "";
    })
    return t_obj;
  }

  /** Populate State variables */
  componentDidMount(){
    fetch('/api/table')
    .then(res => res.json())
     .then(data => {
       let t = data.data;
       let h = this.removeIDKey(data.data[0]);
       let rO = this.createReadOnlyTable(h.length, t.length);
       let changeFields = this.createChangeObject (h);
       
       this.setState( {table:t, headers: h, readOnly:rO, tempUpdateColumns:changeFields} );
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
    console.table(this.state.tempUpdateColumns);
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

  /** Create Update Columns fields */
  updateColumnFields(headerID, index){
    return(
        <td key={index}><input id={headerID} type="text" className="updateColumns" value={this.state.tempUpdateColumns[headerID]} onChange={this.updateColumnFieldChange} /></td>
    );
  }

  /** Update Columns Field Changed */
  updateColumnFieldChange(event){
    let t_change = this.state.tempUpdateColumns;
    t_change[event.target.id] = event.target.value;
    this.setState({tempUpdateColumns: t_change});
  }

  /** Clear Temp Update Columns */
  clearTempUpdateColumns(){
    //console.log("insideClearTempUpdateColumns");
    let t_change = this.state.tempUpdateColumns;
    Object.keys(t_change).forEach(k => t_change[k] = "");
    this.setState({tempUpdateColumns: t_change});
  }

  /** Updating table values from column update fields */
  /** Dev Note, had an issue where the table variable saved in state was not getting copied correctly.
   *    Turns out because the variable is an array of objects, it was getting copied by reference and not value.
   *    -> This problem was solved by doing the below colde
   *        -> this.state.table.map(a => ({...a}));
   *    The TL;Dr is doing a map returns an array, and the spread syntax returns on JSON object by value.
   */
  updateColumns(event){
    let t_table = this.state.table.map(a => ({...a}));
    let t_change = this.state.tempUpdateColumns;

    Object.keys(t_change).forEach(key => {
      if(t_change[key] === "") return; //Don't update the table values if the update column field is blank.
      t_table.forEach(row => {
        row[key] = t_change[key];
      });
    });

    this.setState({table: t_table});
    this.clearTempUpdateColumns();
  }

  /** Handle cell clicked */
  /** Dev Note, I don't think I need this section. 
   *    The oringinal idea was to have table cell change to a text field when it was clicked, 
   *    but the current working code just has a text field showing the data.
   *    I cant think of a scenario where the user would click on the field and not want it to be changed.
   *    The idea of a change element does seem cool, but I think doing it in this scenario it doesnt work.
   *    Maybe come back to it using a simple form ( using one record )
   * 
   */
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
        <table className="table"><tbody><tr>{this.state.headers.map( (header, index) => this.updateColumnFields(header, index) )}</tr></tbody></table>
        <button onClick={this.updateColumns}>Update columns</button>
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