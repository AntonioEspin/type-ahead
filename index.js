const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const list = document.querySelector('.suggestions')
const inputSearch = document.querySelector('.search');
inputSearch.addEventListener('change', displayInfo);
inputSearch.addEventListener('keyup', displayInfo);

async function getData () {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data
}

async function getFindResults (wordInput) {
  const info = await getData()
  const resultsFilter = info.filter (data => {
    const infoValue = new RegExp(wordInput, 'gi')
    return data.city.match(infoValue) || data.state.match(infoValue)
  })
  return resultsFilter
}

async function displayInfo () {
  const citiesAndStates = await getFindResults(this.value)
  if (this.value !== '') {
    const structureHtml = citiesAndStates.map(data => {
      const value = new RegExp(this.value, 'gi')
      const city = data.city.replace(value, `<span class="hl">${this.value}</span>`)
      const state = data.state.replace(value, `<span class="hl">${this.value}</span>`)
      return `
        <li>
          <span class="name">${city}, ${state}</span>
          <span class="population">${data.population}</span>
        </li>
      `
    }).join('');
    list.innerHTML = structureHtml;
  } else {
    list.innerHTML = `
      <li>Filter for a city</li>
      <li>or a state</li>
    `;
  }
}

