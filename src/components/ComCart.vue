<template>
    <div class="cart-container">
      <h2>Giỏ Hàng</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        Giỏ hàng trống
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="`${item.id}-${item.size}`" class="cart-item">
          <img :src="item.image" :alt="item.name">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>Size: {{ item.size }}</p>
            <p>Giá: {{ formatPrice(item.price) }}đ</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
          </div>
          <button class="remove-btn" @click="removeItem(item)">×</button>
        </div>
        <div class="cart-summary">
          <h3>Tổng cộng: {{ formatPrice(total) }}đ</h3>
          <button class="checkout-btn" @click="checkout">Thanh toán</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'; // Đảm bảo import từ vue-router
  
  
  export default {
    name: 'ComCart',
    setup() {
      const cartItems = ref([])
      const router = useRouter()
  
      const loadCart = () => {
        const savedCart = localStorage.getItem('cart')
        cartItems.value = savedCart ? JSON.parse(savedCart) : []
      }
  
      const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems.value))
        window.dispatchEvent(new Event('cartUpdated'))
      }
  
      const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price)
      }
  
      const total = computed(() => {
        return cartItems.value.reduce((sum, item) => {
          return sum + (item.price * item.quantity)
        }, 0)
      })
  
      const increaseQuantity = (item) => {
        const cartItem = cartItems.value.find(
          i => i.id === item.id && i.size === item.size
        )
        if (cartItem) {
          cartItem.quantity += 1
          saveCart()
        }
      }
  
      const decreaseQuantity = (item) => {
        const cartItem = cartItems.value.find(
          i => i.id === item.id && i.size === item.size
        )
        if (cartItem && cartItem.quantity > 1) {
          cartItem.quantity -= 1
          saveCart()
        }
      }
  
      const removeItem = (item) => {
        cartItems.value = cartItems.value.filter(
          i => !(i.id === item.id && i.size === item.size)
        )
        saveCart()
      }
  
      const checkout = () => {
        if (cartItems.value.length === 0) {
          alert('Giỏ hàng trống! Vui lòng thêm sản phẩm.')
          return
        }
        router.push('/bill') // Chuyển đến giao diện ComBill
      }
  
      onMounted(() => {
        loadCart()
        window.addEventListener('cartUpdated', loadCart)
      })
  
      return {
        cartItems,
        formatPrice,
        total,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        checkout,
        router
      }
    }
  }
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .empty-cart {
    text-align: center;
    padding: 20px;
    color: #666;
  }
  
  .cart-item {
    display: flex;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    position: relative;
  }
  
  .cart-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .item-details {
    margin-left: 20px;
    flex-grow: 1;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-controls button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  
  .checkout-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .checkout-btn:hover {
    background-color: #45a049;
  }
  </style>