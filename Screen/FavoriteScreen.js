import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FavoriteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const products = [
    {
      id: "1",
      name: "Black Simple Lamp",
      price: "12.00",
      description: "A stylish black lamp...",
      image: require("../assets/product.jpg"),
      rating: 4.5,
      colors: ["#000000", "#f4f4f4", "#c0c0c0"],
      quantity: 1,
    },
    {
      id: "2",
      name: "Minimal Stand",
      price: "25.00",
      description: "Simple and elegant stand...",
      image: require("../assets/product2.jpg"),
      rating: 4.0,
      colors: ["#ffffff", "#cccccc"],
      quantity: 1,
    },
  ];
  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.productImage} />

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="bag" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="close-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
       
        <Text style={styles.headerTitle}>Favorites</Text>
        
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.addAllBtn}>
        <Text style={styles.addAllText}>Add all to my cart</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    justifyContent: 'space-between',
    height: 80,
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 10,
  },
  addAllBtn: {
    // position: "absolute",
    bottom: 1,
    alignSelf: "center",
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 8,
    width: '95%',

  },
  addAllText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: 'center'
  },
  bottomTabs: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
});
