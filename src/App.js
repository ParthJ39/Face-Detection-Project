import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'b869d1b107434df5a353407c1c655b3f'
});

const particlesOptions = {
 particles:{
  number: {
    value: 80,
      density: {
        enable: true,
        value_area: 800
      }
     }
   },
 interactivity:{
    events:{
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
   }
   onInputChange = (event) => {
     this.setState({input: event.target.value});
   }
   
   onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
     .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      // do something with response
      },
      function(err) {
      // there was an error
      }
     );
   }

  render(){
    return (
      <div className="App">
        <Particles className="particles"
                  params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
          <FaceRecognition imageUrl={this.state.imageUrl}/>  
      </div>
     );
   } 
}

export default App;
