![pokeSearchAppGif_3 0](https://github.com/Walmufti/pokemonSearchApp/assets/79267405/c5e12697-917e-4909-8033-ac8f89a88fb4)

# Pokémon Search App
#### Video Demo: https://youtu.be/GYnhU-XtK3o
#### Description:
I developed a responsive Pokemon Search Application using HTML, CSS, and JavaScript.
I used an API provided by https://pokeapi.co/
pokeapi.co is a website that holds data about every pokemon. It has data about each pokemons name, ID number, stats, typing, and more. pokeapi.co provides an api where anyone can access the data stored on their servers. I used this api to develop an application that can fetch a pokemons image based on the provided name.

Explaination of the JavaScript code:
This JavaScript code defines a search application with a function called `fetchData` and an event listener setup for an input field with an ID of "pokemonName".
Here's an explanation of each part:

1. `async function fetchData()`: This defines an asynchronous function named `fetchData`. Asynchronous functions allow you to perform operations that may take time to complete, such as fetching data from a server, without blocking the execution of other code.

2. `try`/`catch` block: This is used for error handling. Code within the `try` block is executed, and if an error occurs, it's caught and handled in the `catch` block. In your case, if any error occurs during the execution of the `fetchData` function, it will be caught, and an error message will be logged to the console.

3. Fetching Data:
   - `const pokemonName = document.getElementById("pokemonName").value.toLowerCase();`: This line retrieves the value from an input field with the ID "pokemonName" and converts it to lowercase.
   - `const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);`: This line fetches data from the PokeAPI using the provided Pokemon name. The `await` keyword is used to wait for the fetch operation to complete before proceeding.
   - `const imgElement = document.getElementById("pokemonSprite");`: This line gets a reference to an HTML element with the ID "pokemonSprite", presumably an image element.

4. Error Handling:
   - The code checks if the response from the PokeAPI is not OK (`!response.ok`). If it's not OK, it displays a default "MissingNo." image, shows an alert with an error message, and throws an error.
   - If the response is OK, it proceeds to parse the response JSON.

5. Parsing JSON:
   - `const data = await response.json();`: This line parses the JSON response obtained from the PokeAPI. It waits for the parsing to complete before proceeding.

6. Displaying Data:
   - `const pokemonSprite = data.sprites.front_default;`: This line extracts the URL of the default front sprite of the Pokemon from the response data.
   - `imgElement.src = pokemonSprite;`: This line sets the `src` attribute of the image element (`imgElement`) to the URL of the Pokemon sprite.
   - `imgElement.style.display = "block";`: This line ensures that the image element is visible by setting its display style property to "block".

7. Event Listener:
   - `input.addEventListener("keypress", function(event) { ... });`: This sets up an event listener for keypress events on the input element referenced by the variable `input` (presumably an input field with the ID "pokemonName").
   - When a keypress event occurs, if the pressed key is "Enter", it prevents the default action (form submission) and programmatically clicks a button with the ID "searchBtn".

Overall, this code is responsible for fetching Pokemon data from the PokeAPI based on user input and displaying it on the webpage. Additionally, it allows users to submit their input by pressing the "Enter" key.
