<script>
  import { each, onMount } from 'svelte/internal';
  import Day from './Day.svelte'

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b0e7c6e9bbmsh2cf9c22023cffc8p1e7719jsn37f618a87e3a',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  let weatherResponse = {};
  let weeklyForecast = [];
  onMount(async () => {
		const res = await fetch('https://yahoo-weather5.p.rapidapi.com/weather?location=monterrey&format=json&u=f', options);
    weatherResponse = await res.json();
    weeklyForecast = weatherResponse.forecasts.slice(0, 7);
	});

  const fullDate = new Date();
  const today = fullDate.getDate();
  let dates = [];
  for (let i = 0; i < 7; i++) {
    fullDate.setDate(today + i);
    dates.push(fullDate.getDate());
  }

</script>


<body>
  {#if weatherResponse.location}
    <h1 class='day'>{weatherResponse.location.city}, {weatherResponse.location.region}, {weatherResponse.location.country}</h1>
    <div class="wrapper">
      {#each weeklyForecast as {...day}, i}
        <Day {day} date={dates[i]} />
      {/each}
    </div>
  {:else}
    <h1>Loading...</h1>
  {/if}
</body>

<style>

  body {
    background: #E9F5FA;
    padding: 0;
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #weather {
    position: absolute;
  }

  .day {
    color: #000;
    font-family: 'Krona One', sans-serif;
    text-align: center;
  }

  .wrapper {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
</style>
