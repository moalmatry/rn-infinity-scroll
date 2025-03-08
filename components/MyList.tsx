import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      console.log(response);
      const responseJson = await response.json();

      setItems(responseJson.results);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) return <ActivityIndicator />;
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default MyList;
