import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async (url) => {
  const response = await axios.get(url);
  return response.data;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
      pokemons: [],
      loading: false,
      nextUrl: null,
      previousUrl: null,
      error: null,
      pokedex: [], 
    },
    reducers: {
      addToPokedex: (state, action) => {
        
        const pokemonToAdd = state.pokemons.find(pokemon => pokemon.name === action.payload);
        if (pokemonToAdd && !state.pokedex.find(pokemon => pokemon.name === action.payload)) {
          
          state.pokedex.push(pokemonToAdd);
        }
      },
      removeFromPokedex: (state, action) => {
        state.pokedex = state.pokedex.filter(pokemon => pokemon.name !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPokemons.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPokemons.fulfilled, (state, action) => {
          state.loading = false;
          state.pokemons = action.payload.results;
          state.nextUrl = action.payload.next;
          state.previousUrl = action.payload.previous;
        })
        .addCase(fetchPokemons.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const { addToPokedex, removeFromPokedex } = pokemonSlice.actions;
  
  export default pokemonSlice.reducer;
  