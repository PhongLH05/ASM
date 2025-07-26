import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Minimal Stand',
      price: 25.0,
      quantity: 1,
      image: require('../assets/product2.jpg'),
    },
    {
      id: '2',
      name: 'Coffee Table',
      price: 20.0,
      quantity: 1,
      image: require('../assets/product3.jpg'),
    },
    {
      id: '3',
      name: 'Minimal Desk',
      price: 50.0,
      quantity: 1,
      image: require('../assets/product4.jpg'),
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => increaseQty(item.id)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{String(item.quantity).padStart(2, '0')}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decreaseQty(item.id)}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="close-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.promoContainer}>
        <TextInput
          placeholder="Enter your promo code"
          style={styles.promoInput}
        />
        <TouchableOpacity style={styles.promoBtn}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Check out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    alignSelf: 'center',
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 100, height: 100, borderRadius: 12 },
  name: { fontSize: 16, fontWeight: '500', color: '#444' },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 6 },
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qtyText: { fontSize: 18 },
  qtyValue: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    width: 30,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  promoContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  promoInput: {
    flex: 1,
    height: 50,
  },
  promoBtn: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#777',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  checkoutBtn: {
    bottom: 1,
    alignSelf: "center",
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 8,
    width: '95%',
    marginTop: 12
  },
  checkoutText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
