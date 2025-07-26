import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  console.log(item.image)

  return (
    <View style={styles.container}>
      {/* BACK + FAVORITE BUTTON */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Icon name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart-o" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <Image source={ item.image } style={styles.image} />

      {/* COLOR OPTIONS */}
      <View style={styles.colorOptions}>
        {["#888", "#c79b63", "#f3d4aa"].map((color, index) => (
          <View key={index} style={[styles.colorDot, { backgroundColor: color }]} />
        ))}
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.rating}>
            <Icon name="star" size={18} color="#f9c200" />
            <Text style={styles.ratingText}> 4.5 (50 reviews)</Text>
          </View>
        </View>

        {/* QUANTITY STEPPER */}
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepButton} onPress={handleDecrease}>
            <Text style={styles.stepButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{String(quantity).padStart(2, "0")}</Text>
          <TouchableOpacity style={styles.stepButton} onPress={handleIncrease}>
            <Text style={styles.stepButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.description}>{item.description}</Text>

        {/* ACTION BUTTONS */}
        <View style={styles.fixedFooter}>
    <TouchableOpacity style={styles.bookmarkBtn}>
      <Icon name="bookmark-o" size={22} color="#000" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.cartBtn}
      onPress={() => navigation.navigate("CartScreen", { item })}
    >
      <Text style={styles.cartBtnText}>Add to cart</Text>
    </TouchableOpacity>
  </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: 40 },
  header: {
    position: "absolute",
    top: StatusBar.currentHeight || 40,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  colorOptions: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    gap: 12,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: "#555",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  stepButton: {
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  stepButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookmarkBtn: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 15,
  },
  cartBtn: {
    backgroundColor: "#111",
    flex: 1,
    marginLeft: 20,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  cartBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});


export default ProductDetails;
