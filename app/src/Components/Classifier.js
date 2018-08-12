import React,{Component} from 'react'
import { Input,Button,Icon,Divider,Grid,Label,Dropdown } from 'semantic-ui-react'
import axios from 'axios';

const options_geo = [
  { key: 'france', text: 'France', value: 'France' },
  { key: 'spain', text: 'Spain', value: 'Spain' },
  { key: 'germany', text: 'Germany', value: 'Germany' },
]

const options_gender = [
  { key: 'male', text: 'Male', value: 'Male' },
  { key: 'female', text: 'Female', value: 'Female' },
]

class Classifier extends Component {
  constructor(){
    super()
    this.state = {
      credit_c : "",
      geo_c : "",
      gender_c : "",
      age_c : "",
      tenure_C : "",
      balance_c : "",
      numofproducts_c : "",
      hascr_c : "",
      isactive_c : "",
      estimated_c : "",
      result :"",
      a:""
    }

    this.classifierClick = this.classifierClick.bind(this);
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

  };




  classifierClick()  {
    var self = this
  
    const data_c = {
      CreditScore : this.state.credit_c,
      Geography : this.state.geo_c,
      Gender : this.state.gender_c,
      Age : this.state.age_c,
      Tenure : this.state.tenure_c,
      Balance : this.state.balance_c,
      NumOfProducts : this.state.numofproducts_c,
      HasCrCard : this.state.credit_c,
      IsActiveMember : this.state.isactive_c,
      EstimatedSalary : this.state.estimated_c,
    }

    fetch('http://localhost:8888/classifier',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(data_c)
    }).then(res=>res.json()).then(function (data) {
      self.setState({
          result : data.result
      })
      self.props.result(data.result);
  })

  }

  render(){
    return(
    <Grid.Column width={6} >
    <Grid.Column width={4} >
          <Input icon='write' id="password-input" fluid placeholder='CreditScore' value={this.state.credit_c} onChange={this.handleChange('credit_c')}  type="number"/>
          </Grid.Column>
          <Grid.Column width={4}   >
          <select className="ui fluid selection dropdown" onChange={this.handleChange('geo_c')} placeholder="Geography" >
            <option></option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="Germany">Germany</option>
          </select>
          {/* <Input icon='write' fluid placeholder='Geography' value={this.state.geo_c} onChange={this.handleChange('geo_c')}   /> */}
          </Grid.Column>
          <Grid.Column width={4} >

          <select className="ui fluid selection dropdown" onChange={this.handleChange('gender_c')} placeholder="Gender" >
            <option></option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

          {/* <Input icon='write' fluid placeholder='Gender' value={this.state.gender_c} onChange={this.handleChange('gender_c')}  /> */}
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='Age' value={this.state.age_c} onChange={this.handleChange('age_c')} type="number"   />
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='Tenure' value={this.state.tenure_c} onChange={this.handleChange('tenure_c')}  type="number" />
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='Balance' value={this.state.balance_c} onChange={this.handleChange('balance_c')} type="number" />
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='NumOfProducts' value={this.state.numofproducts_c} onChange={this.handleChange('numofproducts_c')} type="number" />
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='HasCrCard' value={this.state.hascr_c} onChange={this.handleChange('hascr_c')}  type="number" />
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='IsActiveMember' value={this.state.isactive_c} onChange={this.handleChange('isactive_c')} type="number" />
          </Grid.Column>
          <Grid.Column width={4} >
          <Input icon='write' fluid placeholder='EstimatedSalary' value={this.state.estimated_c} onChange={this.handleChange('estimated_c')} type="number" />
          </Grid.Column>

         <Grid.Column width={4} >
         
        </Grid.Column>
         <Divider horizontal></Divider>

        <Button basic color='black' icon labelPosition='right' onClick={this.classifierClick} fluid>
          Classifier Data
          <Icon name='right arrow' />
        </Button>
    </Grid.Column>


    )
  }
}



export default Classifier