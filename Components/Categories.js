import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons"; // 👈 Thêm dòng này
  import { useNavigation } from "@react-navigation/native";
  
  const Categories = () => {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState("1");
  
    const categoryList = [
      { id: "1", icon: "star", text: "Ghế" },
      { id: "2", icon: "desktop", text: "Bàn" },
      { id: "3", icon: "tv", text: "Tivi" },
      { id: "4", icon: "ellipsis-horizontal", text: "Khác" },
    ];
  
    const handleCategoryPress = (id) => {
      setSelectedId(id);
      console.log("Đã chọn danh mục:", id);
      // navigation.navigate("ProductByCategory", { categoryId: id });
    };
  
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoryList.map((item) => {
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
  