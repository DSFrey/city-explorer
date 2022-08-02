import './App.css';
import React from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEntry: '',
      locationData: {data: [{}]},
      latitude: '',
      longitude: '',
      mapURL: '',
      hideCoordinates: true
    };
  }

  handleSearch = (event) => {
    this.setState({
      searchEntry: event.target.value
    });
  }

  submitLocationHandler = async (event) => {
    event.preventDefault();
    let requestURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchEntry}&format=json`;
    let locationData = await axios.get(requestURL);
    let latitude = locationData.data[0].lat > 0 ? `${locationData.data[0].lat}° N`:`${Math.abs(locationData.data[0].lat)}° S`;
    let longitude = locationData.data[0].lon > 0 ? `${locationData.data[0].lon}° E`:`${Math.abs(locationData.data[0].lon)}° W`;
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=13&size=1000x1000`
    this.setState({
      locationData: locationData,
      latitude: latitude,
      longitude: longitude,
      mapURL: mapURL,
      hideCoordinates: false
    })
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
            <Card.Img variant='bottom' src={this.state.mapURL}/>
          </Card>
        </main>
        <footer>&copy;2022 Daniel Frey</footer>
      </div>
    );
  }
}

export default App;
