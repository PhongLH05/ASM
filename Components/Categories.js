import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
  import { getListCategories, setSelectedCategoryIdAction } from "../Redux/actions/categoryAction";
  import { getProductsByCategoryAction, getListProducts } from "../Redux/actions/productAction";
  import Ionicons from "react-native-vector-icons/Ionicons";
  
  const Categories = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState("1");
    const listCategories = useSelector((state) => state.category.listCategories);

    useEffect(() => {
      dispatch(getListCategories());
    }, [dispatch]);
  

  
    const handleCategoryPress = (id) => {
      setSelectedId(id);
      console.log("Đã chọn danh mục:", id);
      
      if (id === "1") {
        // Nếu chọn category đầu tiên, hiển thị tất cả sản phẩm
        dispatch(setSelectedCategoryIdAction(null));
        dispatch(getListProducts());
      } else {
        // Dispatch action để lọc sản phẩm theo category
        dispatch(setSelectedCategoryIdAction(id));
        dispatch(getProductsByCategoryAction(id));
      }
    };
  
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listCategories.map((item) => {
            const isSelected = item.id === selectedId;
  
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryItem,
                  isSelected && styles.selectedCategoryItem,
                ]}
                onPress={() => handleCategoryPress(item.id)}
              >
                                 <View style={styles.iconWrapper}>
                   <Ionicons
                     name={item.icon}
                     size={28}
                     color={isSelected ? "#F75D5D" : "#52555A"}
                   />
                 </View>
                 <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                   {item.name}
                 </Text>
                
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  
  export default Categories;
  
  const styles = StyleSheet.create({
    categoryItem: {
      marginRight: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedCategoryItem: {
      borderBottomWidth: 2,
      borderBottomColor: "rgba(247, 93, 93, 0.8)",
    },
    iconWrapper: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: "#f2f2f2",
    },
    categoryText: {
      marginTop: 5,
      fontSize: 14,
      color: "#52555A",
      fontWeight: "500",
    },
    selectedCategoryText: {
      color: "rgba(247, 93, 93, 0.9)",
      fontWeight: "bold",
      fontSize: 15,
    },

  });
  