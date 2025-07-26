import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import Icon from "react-native-vector-icons/FontAwesome";
  
  const { width } = Dimensions.get("window");
  const CARD_MARGIN = 10;
  const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
  
  const data = [
    {
        id: "1",
        name: "Black Simple Lamp",
        price: "12.00",
        image: require("../assets/product.jpg"),
        description: "A modern, minimalistic black lamp perfect for study or work desks."
      },
      {
        id: "2",
        name: "Minimal Stand",
        price: "25.00",
        image: require("../assets/product2.jpg"),
        description: "A sleek stand made from lightweight materials for your everyday tech gear."
      },
      {
        id: "3",
        name: "Minimal Stand",
        price: "25.00",
        image: require("../assets/product3.jpg"),
        description: "Elegant and space-saving design, ideal for home or office setups."
      },
      {
        id: "4",
        name: "Minimal Stand",
        price: "25.00",
        image: require("../assets/product4.jpg"),
        description: "Durable and stylish stand to keep your workspace tidy and modern."
      }
  ];
  
  const ProductCard = () => {
    const nav = useNavigation();
  
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => nav.navigate("ProductDetails", { item })}
            style={styles.card}
          >
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={item.image} />
              <View style={styles.iconWrapper}>
                <Icon name="shopping-bag" size={20} color="#666" />
              </View>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>
              <Text style={{ color: "#000" }}>$ </Text>
              {item.price}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
      />
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: CARD_MARGIN,
      paddingTop: 15,
    },
    card: {
      width: CARD_WIDTH,
      marginBottom: 20,
    },
    imageWrapper: {
      borderRadius: 15,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      width: "100%",
      height: 150,
      resizeMode: "cover",
    },
    iconWrapper: {
      position: "absolute",
      bottom: 10,
      right: 10,
      backgroundColor: "#eee",
      padding: 8,
      borderRadius: 8,
      opacity: 0.8,
    },
    name: {
      marginTop: 10,
      fontSize: 16,
      color: "#555",
      textAlign: "center",
    },
    price: {
      marginTop: 5,
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
      textAlign: "center",
    },
  });
  
  export default ProductCard;
  