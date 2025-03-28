<template>
    <header class="header-fixed">
      <div class="container">
        <!-- Logo -->
        <div class="logo" @click="goToHome">
          <img src="/Images/logo.png" alt="Milktea Logo" />
        </div>
  
        <!-- Navigation -->
        <nav>
          <ul>
            <li><router-link to="/">Trang Chủ</router-link></li>
            <li><router-link to="/thucdon">Thực Đơn</router-link></li>
            <li><router-link to="/gioithieu">Giới Thiệu</router-link></li>
            <li><router-link to="/lienhe">Liên Hệ</router-link></li>
            <li><router-link to="/tintuc">Tin Tức</router-link></li>
  
            <!-- User Section -->
            <li v-if="user" class="user-menu">
              <span>Xin Chào, {{ user.name }}</span>
              <div class="dropdown">
                <button class="info-btn">Thông Tin</button>
                <div class="dropdown-menu">
                  <router-link to="/history">Lịch sử mua hàng</router-link>
                  <button @click="logout" class="logout-dropdown-btn">Đăng Xuất</button>
                </div>
              </div>
            </li>
  
            <li v-if="!user"><router-link to="/register">Đăng Ký</router-link></li>
            <li v-if="!user"><router-link to="/login">Đăng Nhập</router-link></li>
          </ul>
        </nav>
  
        <!-- Cart Section -->
        <div class="cta">
          <router-link to="/cart" class="cta-button">
            Giỏ Hàng
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </router-link>
        </div>
      </div>
    </header>
    <div class="header-spacer"></div>
    <router-view />
  </template>
  
  <script>
  import { ref, onMounted, watchEffect } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    name: "ComHeader",
    setup() {
      const user = ref(null);
      const cartItemCount = ref(0);
      const router = useRouter();
  
      const goToHome = () => {
        router.push("/");
      };
  
      const updateCartItemCount = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemCount.value = cartItems.reduce(
          (total, item) => total + (item.quantity || 0),
          0
        );
      };
  
      const loadUserData = () => {
        const userData = JSON.parse(localStorage.getItem("currentUser"));
        user.value = userData || null;
      };
  
      const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("cart");
        user.value = null;
        router.push("/login"); // Điều hướng đến trang đăng nhập sau khi đăng xuất
      };
  
      // Cập nhật dữ liệu khi mounted
      onMounted(() => {
        loadUserData();
        updateCartItemCount();
      });
  
      // Theo dõi thay đổi trong LocalStorage
      watchEffect(() => {
        updateCartItemCount();
        loadUserData();
      });
  
      return {
        user,
        cartItemCount,
        goToHome,
        logout,
      };
    },
  };
  </script>
  
  
  <style scoped>
  /* Header */
  .header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #e7bf83;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .header-spacer {
    height: 190px;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo img {
    height: 100px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .logo img:hover {
    transform: scale(1.05);
  }
  
  /* Navigation */
  nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    gap: 20px;
  }
  
  nav ul li {
    position: relative;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    font-size: 1.1rem;
    padding: 8px 12px;
    border-radius: 4px;
  }
  
  nav ul li a:hover {
    color: #e67d22cd;
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  /* User Menu */
  .user-menu {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .user-menu span {
    font-weight: 500;
    color: #2c3e50;
  }
  
  /* Dropdown */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .info-btn {
    background-color: #e67e22;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  .info-btn:hover {
    background-color: #d35400;
  }
  
  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 4px;
    min-width: 150px;
    z-index: 1000;
  }
  
  .dropdown-menu a,
  .dropdown-menu button {
    display: block;
    text-align: left;
    padding: 10px;
    text-decoration: none;
    color: #2c3e50;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
  }
  
  .dropdown-menu a:hover,
  .dropdown-menu button:hover {
    background-color: #f1f1f1;
  }
  
  .user-menu:hover .dropdown-menu {
    display: block;
  }
  
  /* Cart Section */
  .cta-button {
    padding: 12px 24px;
    background-color: #e67e22;
    color: white;
    text-decoration: none;
    border-radius: 25px;
    position: relative;
    display: inline-block;
  }
  
  .cta-button:hover {
    background-color: #d35400;
  }
  
  .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e74c3c;
    color: white;
    font-size: 12px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  