import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import MyList from "@/components/MyList";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MyList />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingTop: 30,
  },
});
