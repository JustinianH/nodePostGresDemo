const axios = require('axios').default;
import {nytApi, nytApiKey} from '../config/config';
import CriticsAndPicksResponse from '../models/CriticAndPicksResponse';

const NYT_URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?';

export const searchMovieByName = async (movieName: String) => {
    const url = `${nytApi}query=${movieName}&api-key=${nytApiKey}`;
    let responseData;

    await axios.get(url)
    .then(function (response) {
      // handle success
      responseData = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    return responseData;
}

export const getCriticsPicks = async () => {
    let responseData;

    await axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${nytApiKey}`)
    .then(function (response) {
      // handle success
      responseData = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    return responseData;
}

export const getAllMovies = async () => {
    let responseData;

    await axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=${nytApiKey}`)
    .then(function (response) {
      // handle success
      responseData = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    return responseData;
}

export const getCritic = async () => {
    let responseData;

    await axios.get(`https://api.nytimes.com/svc/movies/v2/critics/A. O. Scott.json?api-key=${nytApiKey}`)
    .then(function (response) {
      // handle success
      responseData = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    return responseData;
}

export const getPicksAndCritics = async () => {
  let aggregateResponse: CriticsAndPicksResponse;

  await axios
    .all([getCriticsPicks(), getCritic()])
    .then(
      axios.spread((...responses) => {
        aggregateResponse = {
            picks: responses[0].results,
            critic: responses[1]
        };
        // use/access the results
      })
    )
    .catch((errors) => {
      // react on errors.
    });

  return aggregateResponse;
};