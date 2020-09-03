// DRAW MAP
const $map = document.getElementById('map')
const mapa = new window.google.maps.Map($map, {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 3,
    styles: styles,
  })

// GET DATA
const Summary = 'https://covid19.mathdro.id/api/'
const TodosLosPaises = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest"
// const PorPais = 'https://covid19.mathdro.id/api/countries/USA'

const getData = async api => {
  const response = await fetch(api)
  const data = await response.json()
  return data
}


// Draw Pines
const drawPines = async () => {
  let popUp = new google.maps.InfoWindow()
  const paises = await getData(TodosLosPaises)

  paises.forEach(pais => {
    if(pais.confirmed > 0)
    {
      const marker = new window.google.maps.Marker({
        position: {
          lat: pais.location.lat,
          lng: pais.location.lng,
        },
        map: mapa,
        title: pais.countryregion,
        // icon: {url: './pin.png', scaledSize: new google.maps.Size(25, 25)}
        // shadow: pinShadow
      })
      let content = `
      <h3><strong>${pais.countryregion}</strong></h3>
      <p>Casos: ${pais.confirmed}</p>
      <p>Recuperados: ${pais.recovered}</p>
      <p>Muertes: ${pais.deaths}</p>
      `
      // <a href="grafica.html" class="btn">Ver Grafica</a>

      marker.addListener("click", () => {
        popUp.setContent(content)
        popUp.open(mapa, marker)
      })
    }
  });
}


// Draw DATA
const drawData = async () => {

  const data = await getData(Summary)
  const $newCases = document.getElementById('newCases')
  const template = `
  <p><span>Confirmados:</span> ${data.confirmed.value}</p>
  <p><span>Recuperados:</span> ${data.recovered.value}</p>
  <p><span>Muertes:</span> ${data.deaths.value}</p>
  `
  $newCases.innerHTML=""
  $newCases.insertAdjacentHTML('afterbegin', template)
  
  drawPines()
}

drawData()
