import React,{Component} from 'react'
import { Input,Button,Icon,Divider,Grid,Label,Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import NewData from './Components/NewData';
import Classifier from './Components/Classifier';
import Result from './Components/Result';

const options_geo = [
  { key: 'france', text: 'France', value: 'France' },
  { key: 'spain', text: 'Spain', value: 'Spain' },
  { key: 'germany', text: 'Germany', value: 'Germany' },
]

const options_gender = [
  { key: 'male', text: 'Male', value: 'Male' },
  { key: 'female', text: 'Female', value: 'Female' },
]

class PredictForm extends Component {

  constructor(){
    super()
    this.state = {
      obj : {},
      result : ""
    }


    this.trainClick = this.trainClick.bind(this);
  }

  trainClick() {
    var self = this
    fetch('http://localhost:8888/train',{
          method:'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
          },
    }).then(res=>res.json()).then(function (data) {
        self.setState({
            result : data.result
        })
    })
  }


  static getDerivedStateFromProps(props, state){
    if(typeof(state)!=="undefined"){
      console.log(state)
    }
  }
  

  myCallback = (dataFromChild) => {
    this.setState({ result: dataFromChild});
}


  render(){
    return(
      <div>

        <Button basic color='yellow' onClick={this.trainClick}  icon labelPosition='right' fluid>
          Train Data
          <Icon name='right arrow' />
        </Button>

        <Divider horizontal></Divider>
      <Grid>
      <NewData></NewData>
      <Classifier result={this.myCallback}></Classifier>
      <Result result={this.state.result}></Result>

    </Grid>
      </div>
    )
  }
}


export default PredictForm
