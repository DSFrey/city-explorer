import './App.css';
import React from 'react';
import { Button, Card, Form, InputGroup, Badge } from 'react-bootstrap';
import axios from "axios";
import Weather from './Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEntry: '',
      //LocationIQ varaiables
      locationData: { data: [{}] },
      latitude: '',
      longitude: '',
      mapURL: '',
      hideCoordinates: true,
      locationSuccessful: true,
      locationErrorMessage: '',
      //Weather variables
      forecast: { data: [] },
      showWeather: false,
      weatherError: false,
      weatherErrorMessage: ''
    };
  }

  handleSearch = (event) => {
    this.setState({
      searchEntry: event.target.value
    });
  }

  submitLocationHandler = async (event) => {
    event.preventDefault();
    let locationData
    try {
      let requestURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchEntry}&format=json`;
      locationData = await axios.get(requestURL);
      let latitude = locationData.data[0].lat > 0 ? `${locationData.data[0].lat}° N` : `${Math.abs(locationData.data[0].lat)}° S`;
      let longitude = locationData.data[0].lon > 0 ? `${locationData.data[0].lon}° E` : `${Math.abs(locationData.data[0].lon)}° W`;
      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=13&size=1000x1000`;
      this.setState({
        locationData: locationData,
        latitude: latitude,
        longitude: longitude,
        mapURL: mapURL,
        hideCoordinates: false,
        locationSuccessful: true
      })
    } catch (error) {
      console.log('location error', error);
      this.setState({
        hideCoordinates: true,
        locationSuccessful: false,
        locationErrorMessage: `${error.message}: ${error.response.data.error}`,
        forecast: { data: [] },
      })
    }
    try {
      let forecastURL = `${process.env.REACT_APP_SERVER_KEY}forecast?lat=${locationData.data[0].lat}&lon=${locationData.data[0].lon}`;
      let forecastReturn = await axios.get(forecastURL);
      this.setState({
        forecast: forecastReturn,
        showWeather: true,
        weatherError: false,
        weatherErrorMessage: ''
      })
    } catch (error) {
      console.log('weather error', error);
      this.setState({
        forecast: { data: [] },
        showWeather: false,
        weatherError: true,
        weatherErrorMessage: `${error.message}: ${error.response.data}`,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Location Explorer</h1>
        </header>
        <main>
          <Form onSubmit={this.submitLocationHandler}>
            <InputGroup>
              <InputGroup.Text>Search Location</InputGroup.Text>
              <Form.Control type="text" placeholder='Location' onChange={this.handleSearch}></Form.Control>
              <Button type='submit'>Explore!</Button>
            </InputGroup>
          </Form>
          <Card hidden={this.state.hideCoordinates} >
            <Card.Title>{this.state.locationData.data[0].display_name}</Card.Title>
            <Card.Text>{this.state.latitude}, {this.state.longitude}</Card.Text>
            <Card.Img variant='bottom' src={this.state.mapURL} />
          </Card>
          <Badge bg='danger' hidden={this.state.locationSuccessful} >{this.state.locationErrorMessage}</Badge>
          <Weather showWeather={this.state.showWeather} weatherError={this.state.weatherError} weatherErrorMessage={this.state.weatherErrorMessage} forecast={this.state.forecast} />
        </main>
        <footer>&copy;2022 Daniel Frey</footer>
      </div>
    );
  }
}

export default App;
