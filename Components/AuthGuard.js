import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from '../Redux/actions/authAction';

const AuthGuard = ({ children, requiredRole = null }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Nếu không đăng nhập, không hiển thị gì (sẽ được điều hướng về Login)
  if (!isAuthenticated) {
    return null;
  }

  // Nếu có yêu cầu role cụ thể và user không có role đó
  if (requiredRole && role !== requiredRole) {
    return null;
  }

  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AuthGuard;
