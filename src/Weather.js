import React from 'react';
import { Card, Badge } from 'react-bootstrap';

class Weather extends React.Component {
  render() {
    let weatherDisplay = (
      this.props.showWeather ?
        this.props.forecast.data.map((day, index) => {
          return (
            <Card key={index}>
              <Card.Title>{day.date}</Card.Title>
              <Card.Body>{day.description}</Card.Body>
            </Card>
          );
        })
        : this.props.weatherError ?
          <Badge bg='danger' >{this.props.weatherErrorMessage}</Badge>
          : <></>
    )
    return (
      <div id='forecast'>
        {weatherDisplay}
      </div>
    )
  }
}

export default Weather;