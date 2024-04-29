//TMDB API Key
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => renderMovies(response.results))
  .catch(err => console.error(err));

const moviesContainer = document.getElementById('movie_container');

//Create movie card
const createMovieCard = movie => {
  const { id, title, overview, poster_path, vote_average } = movie;

  const moviecard = document.createElement('div');
  const movieposter = document.createElement('img');
  const titleElement = document.createElement('h1');
  const overviewElement = document.createElement('p');
  const voteAvgElement = document.createElement('p');

  moviecard.setAttribute('id', id);


  //Class name
  moviecard.className = 'movie-card';
  movieposter.className = 'movie-poster';
  titleElement.className = 'title';
  overviewElement.className = 'overview';
  voteAvgElement.className = 'vote-average';

  //Get movie information
  movieposter.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;
  overviewElement.textContent = overview;
  voteAvgElement.textContent = `<Vote Average: ${parseFloat(vote_average).toFixed(2)}>`;

  moviecard.appendChild(movieposter);
  moviecard.appendChild(titleElement);
  moviecard.appendChild(overviewElement);
  moviecard.appendChild(voteAvgElement);

  return moviecard;
};

//ID Alert when click on Movie Card
const renderMovies = movies => {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const moviecard = createMovieCard(movie);
    moviesContainer.appendChild(moviecard);

    moviecard.addEventListener('click', () => {
      const movieID = moviecard.getAttribute('id');
      alert(`영화의 ID는 ${movieID}`);
    })
  });

  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-button');

  // Function to search and render movies based on the search term
  const searchMovies = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;

    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.title.toLowerCase().includes(searchTerm));
      renderMovies(filteredMovies);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  // Refresh after clicking on the header-image
  const title = document.querySelector('.header-image');
  title.addEventListener('click', () => {
    location.reload();
  });

  // Event listener for search button click
  searchBtn.addEventListener('click', searchMovies);

  // Event listener for search input keyup (for live search)
  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
}