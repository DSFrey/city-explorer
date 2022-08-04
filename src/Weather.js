import React from 'react';
import { Card, Badge, Col } from 'react-bootstrap';

class Weather extends React.Component {
  render() {
    let weatherDisplay = (
      this.props.showWeather ?
        this.props.forecast.data.map((day, index) => {
          return (
            <Card key={index}>
              <Card.Title>{day.date}</Card.Title>
              <Card.Img src={day.icon} />
              <Card.Body>
                <Card.Text>{day.description}</Card.Text>
                <div id='temperature-container'>
                  <Col>
                    <h3>Low</h3>
                    <Card.Text>{day.low}°</Card.Text>
                  </Col>
                  <Col>
                    <h3>High</h3>
                    <Card.Text>{day.high}°</Card.Text>
                  </Col>
                </div>
                <Card.Text>{day.rain}% chance of precipitation</Card.Text>
              </Card.Body>
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