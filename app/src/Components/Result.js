import React,{Component} from 'react'
import { Input,Button,Icon,Divider,Grid,Label,Dropdown,Image } from 'semantic-ui-react'

class Result extends Component {
  constructor(){
    super()
  }


  render(){
    return(

      <Grid.Column width={4} >
      <Label as='a' basic>
        Result
        <Icon name='right arrow' />
        <Divider></Divider>


        {this.props.result == "success" &&
        <Image   src='success.png' size='small' wrapped />
        }

        
        {this.props.result == "0" &&
        <Image   src='relax.png' size='small' wrapped />
        }
        {this.props.result == "1" &&
        <Image   src='churn.png' size='small' wrapped />
        }

      </Label>
      </Grid.Column>






    )
  }
}


export default Result