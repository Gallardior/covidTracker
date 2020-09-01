// GET DATA
const Global = 'https://api.covid19api.com/summary'
const PorPais = 'https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-01-01T00:00:00Z&to=2020-08-01T00:00:00Z'
const TodosLosPaises = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest"

const getData = async api => {
  const response = await fetch(api)
  const data = await response.json()
  return data
}

// DRAW DATA
const drawData = async () => {

  const data = await getData(Global)
  const $newCases = document.getElementById('newCases')
  const template = `
  <p><span>Confirmados:</span> ${data.Global.TotalConfirmed}</p>
  <p><span>Recuperados:</span> ${data.Global.TotalRecovered}</p>
  <p><span>Muertes:</span> ${data.Global.TotalDeaths}</p>
  `
  $newCases.insertAdjacentHTML('afterbegin', template)
  
  // drawPines()
}

drawData()


// Draw Chart
const drawChart = () => {
  const context = document.getElementById('chart').getContext('2d')
  const chart = new Chart(context, {
    type: 'line',
    data: {
      labels: [1, 20, 50, 60],
      datasets: [
        {
          label: "Confirmados",
          data: [10,10,30,100]
        },
        {
          label: "Muertes",
          data: [1,20,30,40]
        },
        {
          label: "Recuperados",
          data: [5,10,17,20]
        }
      ]
    }
    
  })
}

drawChart()

const datitos = getData('https://api.covid19api.com')
  .then( r => {
    console.log(r)
    // r.Countries.forEach(country => {
    //   console.log(country.Date)
    // });
  })