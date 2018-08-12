import React,{Component} from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Input,
} from 'semantic-ui-react'

import PredictForm from './PredictForm'

class Home extends Component  {


  render(){
    return(
      <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='favicon.ico' style={{ marginRight: '1.5em' }} />
            Churn Analysis
          </Menu.Item>
        </Container>
      </Menu>
  
      <Container text style={{ marginTop: '7em' }}>
          <PredictForm></PredictForm>
      </Container>
  
    </div>

    )
  }

}



export default Home