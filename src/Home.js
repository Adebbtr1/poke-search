import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, addToPokedex, removeFromPokedex } from './features/pokemonSlice';
import { Container, Grid, Button, Typography, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, nextUrl, previousUrl, error, pokedex } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=10'));
  }, [dispatch]);

  const handleAddToPokedex = (name) => {
    dispatch(addToPokedex(name));
  };

  const handleRemoveFromPokedex = (name) => {
    dispatch(removeFromPokedex(name));
  };

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
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: 'Black' }}  
      >
        Lista de Pokémons
      </Typography>

      {error && <Typography color="error" align="center">{error}</Typography>}

      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }}>
              <PokemonCard name={pokemon.name} />
            </Link>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'yellow', color: 'black', marginTop: 1 }} 
              onClick={() => handleAddToPokedex(pokemon.name)}
            >
              Adicionar à Pokedex
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" align="center" sx={{ marginTop: 5, color: 'white' }}>
        Pokedex
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {pokedex.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: '#333', color: 'white' }}>
              <CardMedia
                component="img"
                alt={pokemon.name}
                height="140"
                image={pokemon.sprites?.front_default || 'https://via.placeholder.com/150'}  
              />
              <CardContent>
                <Typography variant="h6" color="error">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'yellow', color: 'black', marginTop: 1 }}
                  onClick={() => handleRemoveFromPokedex(pokemon.name)}
                >
                  Remover da Pokedex
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        {previousUrl && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(fetchPokemons(previousUrl))}
            style={{ marginRight: 10 }}
          >
            Anterior
          </Button>
        )}
        {nextUrl && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(fetchPokemons(nextUrl))}
          >
            Próximo
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Home;
