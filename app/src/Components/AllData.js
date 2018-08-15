import React,{Component} from 'react'
import { Table } from 'semantic-ui-react'

const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
]

class AllData extends Component{
  constructor(){
    super()
    this.state = {
      data : []
    }
  }

componentDidMount(){
   var self = this

  fetch('http://localhost:8888/allData',{
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json',
    }
    }).then(res=>res.json()).then(function(data_){
        self.setState({
          data : data_.result
      })
    })
}


  render(){
    return (
      <div>
          <Table color={colors[-1]} key={colors[-1]} inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>CreditScore</Table.HeaderCell>
                <Table.HeaderCell>Geography</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Tenure</Table.HeaderCell>
                <Table.HeaderCell>Balance</Table.HeaderCell>
                <Table.HeaderCell>NumofProducts</Table.HeaderCell>
                <Table.HeaderCell>HasCrCard</Table.HeaderCell>
                <Table.HeaderCell>IsActiveMember</Table.HeaderCell>
                <Table.HeaderCell>EstimatedSalary</Table.HeaderCell>
                <Table.HeaderCell>Exited</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
    
            <Table.Body>
            {this.state.data.map(data => (
              <Table.Row>
                <Table.Cell>{data.CreditScore}</Table.Cell>
                <Table.Cell>{data.Geography}</Table.Cell>
                <Table.Cell>{data.Gender}</Table.Cell>
                <Table.Cell>{data.Age}</Table.Cell>
                <Table.Cell>{data.Tenure}</Table.Cell>
                <Table.Cell>{data.Balance}</Table.Cell>
                <Table.Cell>{data.NumofProducts}</Table.Cell>
                <Table.Cell>{data.HasCrCard}</Table.Cell>
                <Table.Cell>{data.IsActiveMember}</Table.Cell>
                <Table.Cell>{data.EstimatedSalary}</Table.Cell>
                <Table.Cell>{data.Exited}</Table.Cell>
              </Table.Row>
            ))}
            </Table.Body>
          </Table>
      </div>
    )

  
  }

}

export default AllData