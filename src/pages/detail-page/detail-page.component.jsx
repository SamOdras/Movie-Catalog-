import React, { useEffect, useState, useCallback } from 'react';
import './detail-page.style.scss'
import history from './../../history';
import Axios from 'axios';

const movieAPI = "http://www.omdbapi.com/?apikey=e3fad09a&";
const DetailPage = (props) => {
  const { location, setIsLoading } = props
  const [movieDetails, setMovieDetails] = useState(null)

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(
        `${movieAPI}&i=${location.state.state.imdbID}`
      );
      setMovieDetails(response.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, [setIsLoading, location]);

  useEffect(() => {
    if(!location || !location.state || !location.state.state) history.push("/");
    else {
      getData()
    }
  }, [location, setIsLoading, getData])
  return (
    <>
      {location.state && location.state.state && movieDetails && (
        <div
          className="movie-details-container"
          style={{ padding: "130px 30px 30px 30px" }}
        >
          <div className="header-container">
            <div className="banner-wrapper">
              <img
                src={movieDetails.Poster}
                alt="Move Poster"
                className="header-container__banner"
              />
            </div>
            <div className="header-container__stats">
              <h4 className="stats-title" variant="h4">
                {movieDetails.Title}
              </h4>
              <div className="stats-info">
                <p variant="body1">
                  <b>Release Date</b> : {movieDetails.Released}
                </p>
                <p variant="body1">
                  <b>Duration</b> : {movieDetails.Runtime}
                </p>
                <p variant="body1">
                  <b>Genre</b>: {movieDetails.Genre}
                </p>
                <p variant="body1">
                  <b>Language </b>: {movieDetails.Language}
                </p>
                <p variant="body1">
                  <b>Writer</b> : {movieDetails.Writer}
                </p>
              </div>
              <div className="stats-info">
                <p variant="body1">
                  <b>Actors</b> : {movieDetails.Actors}
                </p>
                <p variant="body1">
                  <b>Awards</b> : {movieDetails.Awards}
                </p>
              </div>
              <div className="stats-info">
                <p variant="body1">
                  <b>Plot</b> : {movieDetails.Plot}
                </p>
              </div>
              <div className="stats-score">
                {movieDetails.Ratings.map((item, key) => {
                  return (
                    <p
                      key={key}
                      variant="body1"
                      className="stats-score__rating"
                    >
                      <span>
                        <b>{item.Value || "No Rating"}</b>
                      </span>
                      <span>
                        {item.Source === "Internet Movie Database"
                          ? "IMD"
                          : item.Source}
                      </span>
                    </p>
                  );
                })}
              </div>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;