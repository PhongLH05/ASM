import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getListProducts,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../Redux/actions/productAction";
import { 
  getListCategories, 
  addCategoryAction, 
  updateCategoryAction, 
  deleteCategoryAction 
} from "../Redux/actions/categoryAction";
import { getImageSource } from "../utils/imageHelper";

const QLSPScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { listProducts } = useSelector((state) => state.product);
  const { listCategories } = useSelector((state) => state.category);

  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [categoryListModalVisible, setCategoryListModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "product.jpg",
    categoryId: "1",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    icon: "cube-outline",
  });

  // Danh sách ảnh có sẵn
  const availableImages = [
    "product.jpg",
    "product2.jpg", 
    "product3.jpg",
    "product4.jpg",
    "startpic.jpg",
    "avatar.jpg"
  ];

  useEffect(() => {
    dispatch(getListProducts());
    dispatch(getListCategories());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "product.jpg",
      categoryId: "1",
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.description) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newProduct = {
      ...formData,
      price: formData.price.toString(),
    };

    dispatch(addProductAction(newProduct));
    setModalVisible(false);
    resetForm();
    Alert.alert("Thành công", "Thêm sản phẩm thành công!");
  };

  const handleEditProduct = () => {
    if (!formData.name || !formData.price || !formData.description) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    const updatedProduct = {
      ...formData,
      price: formData.price.toString(),
    };

    dispatch(updateProductAction(editingProduct.id, updatedProduct));
    setModalVisible(false);
    resetForm();
    Alert.alert("Thành công", "Cập nhật sản phẩm thành công!");
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            dispatch(deleteProductAction(productId));
            Alert.alert("Thành công", "Xóa sản phẩm thành công!");
          },
        },
      ]
    );
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      categoryId: product.categoryId || "1",
    });
    setModalVisible(true);
  };

  const openAddModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        name: category.name,
        icon: category.icon,
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({
        name: "",
        icon: "cube-outline",
      });
    }
    setCategoryModalVisible(true);
  };

  const handleAddCategory = () => {
    if (!categoryFormData.name) {
      Alert.alert("Lỗi", "Vui lòng nhập tên danh mục");
      return;
    }

    const newCategory = {
      ...categoryFormData,
      id: Date.now().toString(),
    };

    dispatch(addCategoryAction(newCategory));
    setCategoryModalVisible(false);
    setCategoryFormData({ name: "", icon: "cube-outline" });
    Alert.alert("Thành công", "Thêm danh mục thành công!");
  };

  const handleEditCategory = () => {
    if (!categoryFormData.name) {
      Alert.alert("Lỗi", "Vui lòng nhập tên danh mục");
      return;
    }

    const updatedCategory = {
      ...editingCategory,
      ...categoryFormData,
    };

    dispatch(updateCategoryAction(editingCategory.id, updatedCategory));
    setCategoryModalVisible(false);
    setCategoryFormData({ name: "", icon: "cube-outline" });
    setEditingCategory(null);
    Alert.alert("Thành công", "Cập nhật danh mục thành công!");
  };

  const handleDeleteCategory = (categoryId) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa danh mục này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            dispatch(deleteCategoryAction(categoryId));
            Alert.alert("Thành công", "Xóa danh mục thành công!");
          },
        },
      ]
    );
  };

  const getCategoryName = (categoryId) => {
    const category = listCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productCategory}>
          Category: {getCategoryName(item.categoryId)}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openEditModal(item)}
        >
          <Ionicons name="pencil" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Ionicons name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
             <View style={styles.header}>
         <TouchableOpacity
           style={styles.backButton}
           onPress={() => navigation.goBack()}
         >
           <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Quản lý sản phẩm</Text>
         <View style={styles.headerButtons}>
                       <TouchableOpacity 
              style={[styles.headerButton, styles.categoryButton]} 
              onPress={() => setCategoryListModalVisible(true)}
            >
              <Ionicons name="list" size={20} color="white" />
            </TouchableOpacity>
           <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
             <Ionicons name="add" size={24} color="white" />
           </TouchableOpacity>
         </View>
       </View>

      <FlatList
        data={listProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Tên sản phẩm</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Nhập tên sản phẩm"
              />

              <Text style={styles.label}>Giá</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
                placeholder="Nhập giá sản phẩm"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Mô tả</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="Nhập mô tả sản phẩm"
                multiline
                numberOfLines={3}
              />

                             <Text style={styles.label}>Ảnh sản phẩm</Text>
               <View style={styles.imageSelector}>
                 {availableImages.map((imageName) => (
                   <TouchableOpacity
                     key={imageName}
                     style={[
                       styles.imageOption,
                       formData.image === imageName && styles.selectedImage,
                     ]}
                     onPress={() =>
                       setFormData({ ...formData, image: imageName })
                     }
                   >
                     <Image
                       source={getImageSource(imageName)}
                       style={styles.imageThumbnail}
                       resizeMode="cover"
                     />
                     {formData.image === imageName && (
                       <View style={styles.imageCheckmark}>
                         <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
                       </View>
                     )}
                   </TouchableOpacity>
                 ))}
               </View>

               <Text style={styles.label}>Danh mục</Text>
               <View style={styles.categorySelector}>
                 {listCategories.map((category) => (
                   <TouchableOpacity
                     key={category.id}
                     style={[
                       styles.categoryOption,
                       formData.categoryId === category.id &&
                         styles.selectedCategory,
                     ]}
                     onPress={() =>
                       setFormData({ ...formData, categoryId: category.id })
                     }
                   >
                     <Text
                       style={[
                         styles.categoryOptionText,
                         formData.categoryId === category.id &&
                           styles.selectedCategoryText,
                       ]}
                     >
                       {category.name}
                     </Text>
                   </TouchableOpacity>
                 ))}
               </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={editingProduct ? handleEditProduct : handleAddProduct}
              >
                <Text style={styles.saveButtonText}>
                  {editingProduct ? "Cập nhật" : "Thêm"}
                </Text>
              </TouchableOpacity>
            </View>
                     </View>
         </View>
       </Modal>

       {/* Modal quản lý category */}
       <Modal
         animationType="slide"
         transparent={true}
         visible={categoryModalVisible}
         onRequestClose={() => setCategoryModalVisible(false)}
       >
         <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
             <View style={styles.modalHeader}>
               <Text style={styles.modalTitle}>
                 {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
               </Text>
               <TouchableOpacity
                 onPress={() => setCategoryModalVisible(false)}
                 style={styles.closeButton}
               >
                 <Ionicons name="close" size={24} color="#333" />
               </TouchableOpacity>
             </View>

             <ScrollView style={styles.formContainer}>
               <Text style={styles.label}>Tên danh mục</Text>
               <TextInput
                 style={styles.input}
                 value={categoryFormData.name}
                 onChangeText={(text) =>
                   setCategoryFormData({ ...categoryFormData, name: text })
                 }
                 placeholder="Nhập tên danh mục"
               />

               <Text style={styles.label}>Icon</Text>
               <View style={styles.iconSelector}>
                 {["cube-outline", "bulb", "desktop", "bed", "ellipsis-horizontal", "star", "heart", "home"].map((iconName) => (
                   <TouchableOpacity
                     key={iconName}
                     style={[
                       styles.iconOption,
                       categoryFormData.icon === iconName && styles.selectedIcon,
                     ]}
                     onPress={() =>
                       setCategoryFormData({ ...categoryFormData, icon: iconName })
                     }
                   >
                     <Ionicons
                       name={iconName}
                       size={24}
                       color={categoryFormData.icon === iconName ? "white" : "#333"}
                     />
                   </TouchableOpacity>
                 ))}
               </View>
             </ScrollView>

             <View style={styles.modalActions}>
               <TouchableOpacity
                 style={styles.cancelButton}
                 onPress={() => setCategoryModalVisible(false)}
               >
                 <Text style={styles.cancelButtonText}>Hủy</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={styles.saveButton}
                 onPress={editingCategory ? handleEditCategory : handleAddCategory}
               >
                 <Text style={styles.saveButtonText}>
                   {editingCategory ? "Cập nhật" : "Thêm"}
                 </Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       </Modal>

       {/* Modal danh sách category */}
       <Modal
         animationType="slide"
         transparent={true}
         visible={categoryListModalVisible}
         onRequestClose={() => setCategoryListModalVisible(false)}
       >
         <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
             <View style={styles.modalHeader}>
               <Text style={styles.modalTitle}>Quản lý danh mục</Text>
               <View style={styles.modalHeaderActions}>
                 <TouchableOpacity
                   style={styles.addCategoryButton}
                   onPress={() => {
                     setCategoryListModalVisible(false);
                     openCategoryModal();
                   }}
                 >
                   <Ionicons name="add" size={20} color="white" />
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={() => setCategoryListModalVisible(false)}
                   style={styles.closeButton}
                 >
                   <Ionicons name="close" size={24} color="#333" />
                 </TouchableOpacity>
               </View>
             </View>

             <FlatList
               data={listCategories}
               renderItem={({ item }) => (
                 <View style={styles.categoryItem}>
                   <View style={styles.categoryInfo}>
                     <View style={styles.categoryIconWrapper}>
                       <Ionicons name={item.icon} size={24} color="#333" />
                     </View>
                     <View style={styles.categoryTextInfo}>
                       <Text style={styles.categoryName}>{item.name}</Text>
                       <Text style={styles.categoryId}>ID: {item.id}</Text>
                     </View>
                   </View>
                   <View style={styles.categoryActions}>
                     <TouchableOpacity
                       style={[styles.actionButton, styles.editButton]}
                       onPress={() => {
                         setCategoryListModalVisible(false);
                         openCategoryModal(item);
                       }}
                     >
                       <Ionicons name="pencil" size={16} color="white" />
                     </TouchableOpacity>
                     <TouchableOpacity
                       style={[styles.actionButton, styles.deleteButton]}
                       onPress={() => handleDeleteCategory(item.id)}
                     >
                       <Ionicons name="trash" size={16} color="white" />
                     </TouchableOpacity>
                   </View>
                 </View>
               )}
               keyExtractor={(item) => item.id}
               contentContainerStyle={styles.categoryList}
               ListEmptyComponent={
                 <View style={styles.emptyCategoryList}>
                   <Ionicons name="folder-open" size={48} color="#ccc" />
                   <Text style={styles.emptyCategoryText}>Chưa có danh mục nào</Text>
                   <TouchableOpacity
                     style={styles.addFirstCategoryButton}
                     onPress={() => {
                       setCategoryListModalVisible(false);
                       openCategoryModal();
                     }}
                   >
                     <Text style={styles.addFirstCategoryButtonText}>Thêm danh mục đầu tiên</Text>
                   </TouchableOpacity>
                 </View>
               }
             />
           </View>
         </View>
       </Modal>
     </SafeAreaView>
   );
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 20,
  },
  productList: {
    padding: 20,
  },
  productItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#FF9500",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  categorySelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "white",
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "white",
  },
  modalActions: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    marginLeft: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButton: {
    backgroundColor: "#28a745",
  },
  imageSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  imageOption: {
    width: 60,
    height: 60,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    position: "relative",
  },
  selectedImage: {
    borderColor: "#007AFF",
    borderWidth: 3,
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  imageCheckmark: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  iconSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  iconOption: {
    width: 50,
    height: 50,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedIcon: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    fontWeight: "500",
  },
  categoryActions: {
    flexDirection: "row",
  },
  categoryList: {
    padding: 20,
  },
  modalHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  addCategoryButton: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryTextInfo: {
    flex: 1,
  },
  categoryId: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  emptyCategoryList: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyCategoryText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
    marginBottom: 20,
  },
  addFirstCategoryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addFirstCategoryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default QLSPScreen;
