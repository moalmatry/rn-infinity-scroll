import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState(
    "https://rickandmortyapi.com/api/character"
  );

  // const fetchItems = async () => {
  //   setLoading(true);
  //   const response = await fetch(``);
  //   const responseJson = await response.json();
  //   console.log(responseJson.info);
  //   setItems(responseJson.results);
  //   setNextPage(responseJson.info.next);
  //   setLoading(false);
  // };

  const fetchNextPage = async () => {
    setLoading(true);
    const response = await fetch(nextPage);
    const responseJson = await response.json();
    console.log(responseJson.info);
    setItems((prev) => [...prev, ...responseJson.results]);
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  // if (loading) return <ActivityIndicator />;
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{ gap: 10 }}
      ListFooterComponent={() => (
        <View>
          {loading && <ActivityIndicator />}
          <Text
            onPress={fetchNextPage}
            style={{ alignSelf: "center", fontSize: 20, color: "blue" }}
          >
            Load more
          </Text>
        </View>
      )}
    />
  );
};

export default MyList;
