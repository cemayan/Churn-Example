import React,{Component} from 'react'
import { Input,Button,Icon,Divider,Grid,Label,Dropdown } from 'semantic-ui-react'
import axios from 'axios';

class NewData extends Component {
  constructor(){
    super()
    this.state = {
      credit : "",
      geo : "",
      gender : "",
      age : "",
      tenure : "",
      balance : "",
      numofproducts : "",
      hascr : "",
      isactive : "",
      estimated : "",
      exited : "",
      result : ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.newDataClick = this.newDataClick.bind(this);
  }



  handleChange = name => event => {
  
    this.setState({
      [name]: event.target.value,
    });
      console.log(event.target.value)
  };


  
  newDataClick()  {

    var self = this
  
    const data= {
      CreditScore : this.state.credit,
      Geography : this.state.geo,
      Gender : this.state.gender,
      Age : this.state.age,
      Tenure : this.state.tenure,
      Balance : this.state.balance,
      NumOfProducts : this.state.numofproducts,
      HasCrCard : this.state.credit,
      IsActiveMember : this.state.isactive,
      EstimatedSalary : this.state.estimated,
      Exited :  this.state.exited,
    }


    fetch('http://localhost:8888',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(data)
    }).then(res=>res.json()).then(function(data){
          self.setState({
            result : data.result
        })
        self.props.result(data.result);
    })
  }



  render(){
    return(



    <Grid.Column width={6}>
      
      <Grid.Column width={4} >
      <Input icon='write' id="password-input" fluid placeholder='CreditScore' value={this.state.credit} onChange={this.handleChange('credit')} type="number" />
      </Grid.Column>
      <Grid.Column width={4} >
      <select className="ui fluid selection dropdown" onChange={this.handleChange('geo')} placeholder="Geography" >
        <option></option>
        <option value="France">France</option>
        <option value="Spain">Spain</option>
        <option value="Germany">Germany</option>
      </select>
      </Grid.Column>
      <Grid.Column width={4} >
      <select className="ui fluid selection dropdown" onChange={this.handleChange('gender')} placeholder="Gender" type="number" >
        <option></option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='Age' value={this.state.age} onChange={this.handleChange('age')} type="number"  />
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='Tenure' value={this.state.tenure} onChange={this.handleChange('tenure')} type="number"  />
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='Balance' value={this.state.balance} onChange={this.handleChange('balance')} type="number" />
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='NumOfProducts' value={this.state.numofproducts} onChange={this.handleChange('numofproducts')} type="number" />
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='HasCrCard' value={this.state.hascr} onChange={this.handleChange('hascr')} type="number"  />
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='IsActiveMember' value={this.state.isactive} onChange={this.handleChange('isactive')} type="number" />
      </Grid.Column>
      <Grid.Column width={4} >
      <Input icon='write' fluid placeholder='EstimatedSalary' value={this.state.estimated} onChange={this.handleChange('estimated')} type="number" />
      </Grid.Column>
      <Grid.Column width={4} >
      <select className="ui fluid selection dropdown" onChange={this.handleChange('exited')} placeholder="Exited" >
        <option></option>
        <option value="0">0</option>
        <option value="1">1</option>
      </select>
      </Grid.Column>

     <Divider horizontal></Divider>

    <Button basic color='blue' icon labelPosition='right' onClick={this.newDataClick} fluid>
      New Data
      <Icon name='right arrow' />
    </Button>

  
  
  </Grid.Column>







    )
  }
}


export default NewData