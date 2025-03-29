const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// replace this string with your full name
const name = "Timmons Xu";

console.log(`My name is ${name}`);

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [
  {
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58",
    name: "Pikachu",
    health: 10,
    level: 1,
  },
];

router.get("/", function (req, res) {
  res.status(200).json(myPokemon);
});

router.post("/", (req, res) => {
  const { name, level, health } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Pokemon name is required" });
  }

  const nameExists = myPokemon.some((p) => p.name === name);
  if (nameExists) {
    return res.status(400).json({ error: "Pokemon name already exists" });
  }

  const newPokemon = {
    id: uuid(),
    name,
    level: level || Math.floor(Math.random() * 10) + 1,
    health: health || Math.floor(Math.random() * 91) + 10,
  };

  myPokemon.push(newPokemon);
  res.status(200).json(newPokemon);
});

router.get("/:pokemonId", function (req, res) {
  const { pokemonId } = req.params;
  const pokemon = myPokemon.find((p) => p.id === pokemonId);

  if (!pokemon) {
    return res.status(404).json({ error: "Pokemon not found" });
  }

  res.status(200).json(pokemon);
});

router.put("/:pokemonId", function (req, res) {
  const { pokemonId } = req.params;
  const { name, level, health } = req.body;

  const index = myPokemon.findIndex((p) => p.id === pokemonId);
  if (index === -1) {
    return res.status(404).json({ error: "Pokemon not found" });
  }

  if (name) myPokemon[index].name = name;
  if (level) myPokemon[index].level = level;
  if (health) myPokemon[index].health = health;

  res.status(200).json(myPokemon[index]);
});

router.delete("/:pokemonId", function (req, res) {
  const { pokemonId } = req.params;
  const index = myPokemon.findIndex((p) => p.id === pokemonId);

  if (index !== -1) {
    myPokemon.splice(index, 1);
  }

  res.status(200).json({ message: "Deleted (if existed)" });
});

module.exports = router;
