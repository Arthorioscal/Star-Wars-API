let ls_planets = document.getElementById('planet_ls');
let planets = [];

async function fetchPlanets() {
    let response = await fetch('https://swapi.dev/api/planets/?format=json');
    let data = await response.json();
    planets = data.results;
    console.log(planets);
}

async function showPlanetInfo(planet) {
    let info = `<strong>Nome:</strong> ${planet.name}
                <strong>Clima:</strong> ${planet.climate}
                <strong>Terreno:</strong> ${planet.terrain}
                <strong>População:</strong> ${planet.population}
                <strong>Gravidade:</strong> ${planet.gravity}`;

    let residents = await Promise.all(planet.residents.map(url => fetch(url).then(res => res.json())));

    let residentsInfo = '<table><tr><th>Nome</th><th>Data de nascimento</th></tr>';
    residentsInfo += residents.map(resident => `<tr><td>${resident.name}</td><td>${resident.birth_year}</td></tr>`).join('');
    residentsInfo += '</table>';

    let modal = document.getElementById('planetModal');
    let span = document.getElementsByClassName('close')[0];
    let planetInfo = document.getElementById('planetInfo');

    planetInfo.innerHTML = info + '<br><br>' + residentsInfo;
    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function printPlanets() {
    planets.forEach(planet => {
        let li = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = planet.name;
        button.className = 'accordion';
        button.onclick = function() {
            showPlanetInfo(planet); 
        };
        li.appendChild(button);
        ls_planets.appendChild(li);
    });
}

function searchPlanet() {
    let searchField = document.getElementById('search_field');
    let searchValue = searchField.value;
    let planet_search = planets.filter(planet => planet.name.toLowerCase().includes(searchValue.toLowerCase()));

    if (planet_search.length === 0) {
        alert('Planeta não encontrado');
    } else {
        ls_planets.innerHTML = '';
        planet_search.forEach(planet => {
            let li = document.createElement('li');
            let button = document.createElement('button');
            button.innerHTML = planet.name;
            button.className = 'accordion';
            button.onclick = function() {
                showPlanetInfo(planet); 
            };
            li.appendChild(button);
            ls_planets.appendChild(li);
        });
    
    }
}

fetchPlanets().then(printPlanets);