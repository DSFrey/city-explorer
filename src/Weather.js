import React from 'react';
import { Card } from 'react-bootstrap';

class Weather extends React.Component {
  render() {
    return (
      <div id='forecast' hidden={this.props.hideCoordinates} >
        {this.props.forecast.data.map((day, index) => {
          return (
            <Card key={index}>
              <Card.Title>{day.date}</Card.Title>
              <Card.Body>{day.description}</Card.Body>
            </Card>
          );
        })}
      </div>
    )
  }
}

export default Weather;