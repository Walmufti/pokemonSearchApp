// Function to fetch Pokémon names from the API based on input
async function fetchPokemonNames(input) {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon names");
      }
      const data = await response.json();
      const pokemonNames = data.results.map(pokemon => pokemon.name);
      const suggestions = pokemonNames.filter(name => name.startsWith(input.toLowerCase()));
      return suggestions;
  } catch (error) {
      console.error("Error fetching Pokémon names:", error);
      return [];
  }
}

// Function to handle input keyup event for autocomplete
document.getElementById("pokemonName").addEventListener("input", async function() {
  const input = this.value;
  const suggestions = await fetchPokemonNames(input);
  showSuggestions(suggestions);
});

// Function to display suggestions
function showSuggestions(suggestions) {

  const suggestionList = document.getElementById("suggestionList");
  suggestionList.innerHTML = ""; // Clear previous suggestions

  suggestions.forEach(suggestion => {
      const listItem = document.createElement("li");
      listItem.textContent = suggestion;
      listItem.classList.add("autocomplete-item");
      listItem.addEventListener("click", function() {
        document.getElementById("pokemonName").value = suggestion;
        suggestionList.innerHTML = ""; // Clear suggestions after selection
        fetchData(); // Automatically trigger search when option is clicked
      });
      suggestionList.appendChild(listItem);
  });
  // Show suggestion list
  suggestionList.style.display = suggestions.length > 0 ? "block" : "none";
}

// Hide suggestion list when clicking outside
document.body.addEventListener("click", function(event) {
  if (!event.target.closest(".autocomplete")) {
    document.getElementById("suggestionList").style.display = "none";
  }
});

// Modify fetchData() function to include autocomplete suggestion selection
async function fetchData() {
  try {
      const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const imgElement = document.getElementById("pokemonSprite");

      if (!response.ok) {
        imgElement.style.display = "block";
        imgElement.src = 'img/MissingNo.png';
        alert("Error: MissingNo. Pokémon not found :(");
        throw new Error("Can not find data");
      }

      const data = await response.json();
      const pokemonSprite = data.sprites.front_default;
      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";

      const IdNumber = document.getElementById("idNumber");
      IdNumber.innerHTML = "";
      const dexNumber = data.id;
      IdNumber.textContent = dexNumber;

      const pokemonTypeElement = document.getElementById("type");
      pokemonTypeElement.innerHTML = "";

      data.types.forEach(type => {
        const typeElement = document.createElement("span");
        typeElement.textContent = type.type.name;
        pokemonTypeElement.appendChild(typeElement);
        pokemonTypeElement.appendChild(document.createTextNode(" "));
      });

      const stats = document.getElementById("stats");
      stats.innerHTML = "";

      data.stats.forEach(stat => {
        const statsElement = document.createElement("span");
        statsElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        stats.appendChild(statsElement);
        const lineBreak = document.createElement("br");
        stats.appendChild(lineBreak);
      });

      const infoElements = document.getElementsByClassName("displayInfo");
      Array.from(infoElements).forEach(info => {
        info.style.display = "block";
      });

  } catch (error) {
      console.error(error);
      const infoElements = document.getElementsByClassName("displayInfo");
      for (let i = 0; i < infoElements.length; i++) {
        infoElements[i].style.display = "none";
      }
  }
}

// Allows "Enter" button to submit typed Pokémon name
const input = document.getElementById("pokemonName");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});
