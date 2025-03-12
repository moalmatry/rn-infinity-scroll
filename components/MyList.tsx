import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const initialPage = "https://rickandmortyapi.com/api/character";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState("");

  // const fetchItems = async () => {
  //   setLoading(true);
  //   const response = await fetch(``);
  //   const responseJson = await response.json();
  //   console.log(responseJson.info);
  //   setItems(responseJson.results);
  //   setNextPage(responseJson.info.next);
  //   setLoading(false);
  // };

  const onRefresh = () => {
    setItems([]);
    setNextPage(initialPage);
  };

  const fetchPage = async (url: string) => {
    if (loading) return;
    console.log("loading next page");
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson.info);
    setItems((prev) => [...prev, ...responseJson.results]);
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  // if (loading) return <ActivityIndicator />;
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{ gap: 10 }}
      onEndReached={() => fetchPage(nextPage)}
      onEndReachedThreshold={3}
      ListFooterComponent={() => (
        <View>{loading && <ActivityIndicator />}</View>
      )}
      refreshing={loading}
      onRefresh={() => console.warn("Hello World")}
    />
  );
};

export default MyList;
