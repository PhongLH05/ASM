import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Alert,
} from "react-native";
import ic1 from "../assets/ic1.png";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../Components/ProductCard";
import Categories from "../Components/Categories";
import { logoutUser } from "../Redux/actions/authAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { selectedCategoryId } = useSelector((state) => state.category);
  const { listCategories } = useSelector((state) => state.category);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            dispatch(logoutUser());
            navigation.navigate('LoginScreen');
          },
        },
      ]
    );
  };

  // Lấy tên category được chọn
  const selectedCategory = listCategories.find(cat => cat.id === selectedCategoryId);
  const categoryTitle = selectedCategory ? `${selectedCategory.name} Products` : "All Products";

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.welcomeText}>Chào mừng, {user?.name || 'User'}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View> */}

      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      
      <Text style={styles.explore}>Explore from categories</Text>
      <Categories />
     
      <Text style={styles.textList}>New Products</Text>
      
      <ProductCard />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
