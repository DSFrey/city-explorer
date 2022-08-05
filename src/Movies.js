import React from 'react';
import { Card, Badge } from 'react-bootstrap';

class Movies extends React.Component {
  render() {
    let movieDisplay = (
      this.props.showMovies ?
        this.props.movieData.data.map((movie, index) => {
          return (
            <Card key={index}>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Img src={movie.image_url} />
              <Card.Body>
                <Card.Text>{movie.overview}</Card.Text>
                <Card.Text>Released on {movie.release_date}</Card.Text>
                <Card.Text>{movie.vote_average}/10 with {movie.vote_count} ratings</Card.Text>
              </Card.Body>
            </Card>
          );
        })
        : this.props.movieError ?
          <Badge bg='danger' >{this.props.movieErrorMessage}</Badge>
          : <></>
    )
    return (
      <div id='movies'>
        {movieDisplay}
      </div>
    )
  }
}

export default Movies;