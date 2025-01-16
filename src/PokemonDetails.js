import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, CircularProgress, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(response.data);
      setLoading(false);
    };
    fetchPokemonDetails();
  }, [name]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;

  return (
    <Container 
      sx={{
        backgroundImage: 'url("https://blog.pensanddolls.com.br/wp-content/uploads/2024/10/capturando-pokemons-raros-os-melhores-colecionaveis-do-universo-pokemon.jpeg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        minHeight: '100vh', 
        padding: '20px',
        backgroundAttachment: 'fixed', 
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
        Detalhes do Pokémon
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#333', color: 'white' }}>
            <CardContent>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} width="200" />
              <Typography variant="h5">{pokemon.name}</Typography>
              <Typography variant="body1">ID: {pokemon.id}</Typography>
              <Typography variant="body1">Altura: {pokemon.height / 10} m</Typography>
              <Typography variant="body1">Peso: {pokemon.weight / 10} kg</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: 'white' }}>Habilidades:</Typography>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index} style={{ color: 'white' }}>{ability.ability.name}</li>
            ))}
          </ul>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: 'white' }}>Stats:</Typography>
          <ul>
            {pokemon.stats.map((stat, index) => (
              <li key={index} style={{ color: 'white' }}>
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: 'yellow', 
            color: 'black', 
            marginTop: 3,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '10px 20px',
          }}
        >
          Voltar para a lista
        </Button>
      </Link>
    </Container>
  );
};

export default PokemonDetail;
