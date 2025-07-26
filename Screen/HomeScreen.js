import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import ic1 from "../assets/ic1.png";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../Components/ProductCard";
import Categories from "../Components/Categories";

const HomeScreen = () => {
  

  const navigation = useNavigation();
  const [productsData, setProductsData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (

     
      <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      
     
      <TouchableOpacity
        onPress={() => navigation.navigate("Favorite")}
        style={{
          position: "absolute",
          marginLeft: 330,
          marginTop: 650,
          zIndex: 1,
        }}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            backgroundColor: "white",
            borderRadius: 100,
          }}
          source={require("../assets/ic5.png")}
        />
      </TouchableOpacity>

      <Text style={styles.explore}>Explore from categories</Text>
      <Categories />
      {/* <FlatList
        data={categoryList}
        keyExtractor={(category) => category.id}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChiTietSanPham", { productId: category.id })
            }
          >
            <View style={styles.itemSmall}>
              <Image style={{ width: 80, height: 80 }} source={category.icon} />
              <Text>{category.text}</Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal={true}
      /> */}

      <Text style={styles.textList}>New Products</Text>
      {/* <FlatList
        data={filteredProducts}
        keyExtractor={(product) => product.id}
        renderItem={({ item: product }) => (
          <View style={styles.itemSanPham}>
            <TouchableOpacity>
              <Image
                style={{ width: 130, height: 120 }}
                source={{ uri: product.image }}
              />
            </TouchableOpacity>
            <View style={styles.textSanPham}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={{ fontWeight: "bold" }}>
                Giá: <Text style={styles.itemGia}>{product.price}</Text>
              </Text>
              <Text>{product.description}</Text>
            </View>
          </View>
        )}
        numColumns={2}
        
      /> */}
      
      <ProductCard />
    </View>
  
   
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },

  input: {
    height: 40,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 25,
    paddingLeft: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  explore: {
    fontSize: 18,
    color: "#cd5c5c",
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 4,
  },

  itemSmall: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
    textAlign: "center",
    alignItems: "center",
  },

  textList: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#cd5c5c",
    marginHorizontal: 20,
    marginVertical: 20,
  },

  itemSanPham: {
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 10,
  },

  textSanPham: {
    marginLeft: 30,
    width: 230,
  },

  itemName: {
    fontWeight: "bold",
    fontSize: 18,
  },

  itemGia: {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

export default HomeScreen;
