import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(response.data);
    };
    fetchPokemonData();
  }, [name]);

  if (!pokemon) return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={pokemon.name}
        height="140"
        image={pokemon.sprites.front_default}
      />
      <CardContent>
        <Typography variant="h5" sx={{ color: 'red' }}> {}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {pokemon.id}
        </Typography>
        <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="primary">
            Ver detalhes
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
