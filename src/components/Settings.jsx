import React from "react";
import axios from 'axios';
import { SketchPicker } from 'react-color';

class Settings extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      color: [],
      background: '',
    };    
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:3010/color')
    .then((response) => {
      this.setState({color : response.data})
      console.log(this.state.color)
    })
  }

  change(){
    if(this.state.background === ""){
      alert("The background color shouldn't be void")
    }
    else if(this.state.background  !== ""){
      axios.post('http://127.0.0.1:3010/color', { 
        backgroundColor: this.state.background,
      });
      alert("Color changed")
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {    
    return (
    <div className = "App">      
      <h1>Background Color for the todo app</h1>
      
      <div className = "settings">
        <SketchPicker        
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
        />    
      </div>
      
      <button onClick={()=>this.change()}>Change</button>    

    </div>     
    )
  }
}
export default Settings;

/*this code was referenced from https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/*/