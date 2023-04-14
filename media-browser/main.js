async function loadMovies() {
    try {
      const response = await fetch('movies.json');
      const movies = await response.json();
      const moviesContainer = document.getElementById('movies-container');
  
      let movieRow;
      movies.forEach((movie, index) => {
        // Create a new row for every 5 movies
        if (index % 5 === 0) {
          movieRow = document.createElement('div');
          movieRow.className = 'image-row';
          moviesContainer.appendChild(movieRow);
        }
  
        const movieItem = `
          <div class="image-wrapper">
            <a href="${movie.file_path}">
              <img class="image" src="${movie.image_url}" alt="${movie.title}">
              <div class="image-title">${movie.title}</div>
              <div class="image-subtitle">${movie.running_time} • ${movie.year} • ${movie.certificate}</div>
            </a>
          </div>
        `;
  
        movieRow.innerHTML += movieItem;
      });
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }
  
  loadMovies();
  
  fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    const moviesContainer = document.getElementById('movies-container');
    data.forEach(movie => {
      const movieDiv = createMovieElement(movie);
      movieDiv.onclick = () => openModal(movie.file_path);
      moviesContainer.appendChild(movieDiv);
    });
  });

function createMovieElement(movie) {
  const movieDiv = document.createElement('div');
  movieDiv.className = 'image-wrapper';

  movieDiv.innerHTML = `
    <img class="image" src="${movie.image_url}" alt="${movie.title}">
    <div class="image-title">${movie.title}</div>
    <div class="image-subtitle">${movie.running_time} • ${movie.year} • ${movie.certificate}</div>
  `;
  return movieDiv;
}

function openModal(movieFilePath) {
  const modal = document.getElementById('movieModal');
  const close = document.querySelector('.close');
  const moviePlayer = document.getElementById('moviePlayer');

  moviePlayer.src = movieFilePath;
  modal.style.display = 'block';

  close.onclick = () => {
    modal.style.display = 'none';
    moviePlayer.pause();
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
      moviePlayer.pause();
    }
  };
}
