import React, { Component } from 'react';
//Comp.
import Destacados from '../Components/Destacados';
import Estrenos from '../Components/Estrenos';
import Titulo from '../Components/Titulo';
//Api handler
import axios from 'axios';
import { connect } from 'react-redux';

class HomePage extends Component {
  static defaultProps = {
    key: 'c6a037cbccebd275ce5948aa040072fb'
  }

  state = {
    popular: [],
    releases: [],
    random: ""
  }
  //On Mount
  async componentDidMount() {
    try {
    //Get Popular 
      const req = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${ this.props.key }&language=en-US&page=1`);
      const random = await req.data.results;
      //Asign random movie
      this.setRandom(random);
      console.log(this);
    //Get Releases
      const reqII = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${ this.props.key}&language=en-US&page=1`);
      this.setState({
        popular: req.data.results,
        releases: reqII.data.results
      });  
    } catch (error) {
      if (error.state === 422) {
        console.log('Server Error')
      }
      console.log(error.message);
    }
  }

  //Set a Random Movie
  setRandom(movies) {
    const random = movies[ Math.floor(Math.random() * movies.length) ];
    console.log(random)
    this.setState({ random });
  }

  render() {
    return (
      <>
        <Destacados pelicula={this.state.random} />
        <Titulo>Lo mas visto:</Titulo>
        <Estrenos pelis={this.state.popular} />
        <Titulo>Proximamente:</Titulo>
        <Estrenos pelis={this.state.releases} />
      </>
    )
  }
}


//Convertir props de la Store centralizada en propiedas en esta f();
const mapStateToProps = ({test}) => {
  return {
    test
  }  
}

export default connect(mapStateToProps)(HomePage);