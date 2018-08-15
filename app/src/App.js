import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
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
import AllData from './Components/AllData'

class Home extends Component  {


  render(){
    return(
      <Router>
      <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a'  header>
            <Image size='mini' src='favicon.ico' style={{ marginRight: '1.5em' }} />
            Churn Analysis
          </Menu.Item>

             <Link exact="true"  to='/' className="item">Home</Link>
              <Link  to='/all' className="item">Data</Link>
        </Container>
      </Menu>
  
      <Container text style={{ marginTop: '7em' }}>
              <Route exact path="/" component={PredictForm} />
              <Route   path="/all" component={AllData} />
      </Container>
  

    </div>
    </Router>
    )
  }

}



export default Home