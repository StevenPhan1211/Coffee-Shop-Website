<template>
    <div class="bill-container">
      <h2>Hóa Đơn</h2>
  
      <div v-if="cartItems.length === 0" class="empty-bill">
        Hóa đơn trống. Quay lại <router-link to="/cart">giỏ hàng</router-link>.
      </div>
  
      <div v-else>
        <div class="bill-info">
          <p><strong>Ngày đặt món:</strong> {{ currentDate }}</p>
          <p><strong>Tên người dùng:</strong> {{ currentUser.name }}</p>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
        </div>
  
        <table class="bill-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Size</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="`${item.id}-${item.size}`">
              <td>{{ item.name }}</td>
              <td>{{ item.size }}</td>
              <td>{{ formatPrice(item.price) }}đ</td>
              <td>{{ item.quantity }}</td>
              <td>{{ formatPrice(item.price * item.quantity) }}đ</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Tổng cộng:</td>
              <td>{{ formatPrice(subtotal) }}đ</td>
            </tr>
            <tr>
              <td colspan="4">VAT (10%):</td>
              <td>{{ formatPrice(vat) }}đ</td>
            </tr>
            <tr>
              <td colspan="4"><strong>Thành tiền:</strong></td>
              <td><strong>{{ formatPrice(total) }}đ</strong></td>
            </tr>
          </tfoot>
        </table>
  
        <button class="confirm-btn" @click="confirmPayment" :disabled="isLoading">
            {{ isLoading ? "Đang xử lý..." : "Xác nhận thanh toán" }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  export default {
    name: 'ComBill',
    setup() {
      const router = useRouter()
      const cartItems = ref([])
      const currentUser = ref({})
      const currentDate = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      const isLoading = ref(false);
  
      const loadCart = () => {
        try {
            const savedCart = localStorage.getItem('cart');
            cartItems.value = savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Lỗi khi tải giỏ hàng:', error);
            cartItems.value = [];
        }
      }
  
      const loadUser = () => {
        try {
            const user = localStorage.getItem('currentUser');
            if (user) {
                currentUser.value = JSON.parse(user);
            } else {
                alert('Bạn cần đăng nhập để tiếp tục!');
                router.push('/login');
            }
        } catch (error) {
            console.error('Lỗi khi tải thông tin người dùng:', error);
            currentUser.value = {};
            router.push('/login');
        }
    };
  
      const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price)
      }
  
      const subtotal = computed(() => {
        return cartItems.value.reduce((sum, item) => {
          return sum + item.price * item.quantity
        }, 0)
      })
  
      const vat = computed(() => {
        return subtotal.value * 0.1 // VAT 10%
      })
  
      const total = computed(() => {
        return subtotal.value + vat.value
      })
  
      const confirmPayment = async () => {
        if (isLoading.value) return; // Ngăn chặn spam nút
        isLoading.value = true;
        try {
            const bill = {
                date: currentDate,
                items: cartItems.value,
                subtotal: subtotal.value,
                vat: vat.value,
                total: total.value,
                userId: currentUser.value.id,
            };
            await axios.post('http://localhost:3000/bills', bill);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            alert('Thanh toán thành công! Hóa đơn đã được lưu.');
            router.push('/');
        } catch (error) {
            console.error('Lỗi khi lưu hóa đơn:', error);
            alert('Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại!');
        } finally {
            isLoading.value = false;
        }
    };
  
      onMounted(() => {
        loadCart()
        loadUser()
      })
  
      return {
        cartItems,
        currentUser,
        currentDate,
        subtotal,
        vat,
        total,
        formatPrice,
        confirmPayment
      }
    }
  }
  </script>
  
  <style scoped>
  .bill-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .empty-bill {
    text-align: center;
    color: #666;
  }
  
  .bill-info {
    margin-bottom: 20px;
  }
  
  .bill-info p {
    margin: 5px 0;
  }
  
  .bill-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .bill-table th,
  .bill-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .bill-table th {
    background-color: #f4f4f4;
  }
  
  .confirm-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    margin: 20px auto;
    font-size: 16px;
  }
  
  .confirm-btn:hover {
    background-color: #45a049;
  }
  </style>
  