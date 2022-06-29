import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';

export interface IPokemons {
  pokemons: string[];
}

export default function Home({ pokemons }: IPokemons): JSX.Element {
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedPokemonImage, setSelectedPokemonImage] = useState(0);

  const getPokemonImage = () => {
    pokemons.forEach((pokemon, index) => {
      if (pokemon === selectedPokemon) {
        setSelectedPokemonImage(index + 1);
      }
    });
  };

  useEffect(() => {
    getPokemonImage();
  }, [selectedPokemon]);

  return (
    <>
      <Dropdown
        title="Selecione o seu Pokémon"
        options={pokemons}
        onSelect={setSelectedPokemon}
      />
      {selectedPokemon && (
        <div className="pokemon">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemonImage}.png`}
          />
          <div>{selectedPokemon}</div>
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50');
  const data = await response.json();

  const pokemons: string[] = [];

  data.results.forEach((item: { name: string }) => {
    pokemons.push(item.name);
  });

  return {
    props: {
      pokemons: pokemons,
    },
  };
};
