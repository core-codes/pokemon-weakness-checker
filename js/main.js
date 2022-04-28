//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getWeaknesses)

//Grab the type list from API array and add new <options> in <select>.
function createOptionsList(data){
  for (let i = 0; i < data.results.length; i++){
    let newOption = `<option>${data.results[i].name}</option>`;
    let newOptionImg = `<img src="https://raw.githubusercontent.com/itsjavi/pokemon-assets/main/assets/svg/types/${newOption}.svg" alt=${newOption}</img>`
    document.querySelector('#selectType').innerHTML += newOption;
    
  }
}

//Grab the weakness list from API array. Add weaknesses to new <li> in results.
function createWeaknessList(data){
  //Clear List
  document.querySelector('#weaknessList').innerHTML = ''
  //Itterate through array to add new <li> for each weakness type
  for (let i = 0; i < data.damage_relations.double_damage_from.length; i++){
    let weakness = data.damage_relations.double_damage_from[i].name
    let newWeaknessItem = `<li>${weakness}</li>`;
    let newWeaknessImg = `<img src="https://raw.githubusercontent.com/itsjavi/pokemon-assets/main/assets/svg/types/${weakness}.svg"</img>`
    document.querySelector('#weaknessList').innerHTML += newWeaknessItem
    document.querySelector('#weaknessList').innerHTML += newWeaknessImg
  }
}



//Get Types to Load into Select Drop-Down, runs on page load
function getTypes() {
  const url = 'https://pokeapi.co/api/v2/type/'
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        createOptionsList(data)
       })
        .catch(err => {
            console.log(`error ${err}`)
      });
}


//Get User Selection, return weaknesses list on button click.
function getWeaknesses() {
  //Grab the <option> selected by user.
  let selectedType = document.querySelector('#selectType').value
  const url = `https://pokeapi.co/api/v2/type/${selectedType}`
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    createWeaknessList(data)

   })
    .catch(err => {
        console.log(`error ${err}`)
  });
}

getTypes()