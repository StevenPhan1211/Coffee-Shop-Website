<template>
    <div class="history">
      <h2>Lịch sử mua hàng</h2>
  
      <!-- Nếu có lịch sử mua hàng -->
      <div v-if="userBills.length > 0">
        <div v-for="bill in userBills" :key="bill.id" class="bill">
          <h3>Hóa đơn #{{ bill.id }} (Ngày: {{ bill.date }})</h3>
          <ul>
            <li v-for="item in bill.items" :key="item.id">
              {{ item.name }} ({{ item.size }}) - {{ item.quantity }} x {{ item.price }}đ
            </li>
          </ul>
          <div>
            <strong>Tổng tiền: {{ bill.total }}đ</strong>
          </div>
        </div>
      </div>
  
      <!-- Nếu không có lịch sử mua hàng -->
      <div v-else>
        <p>Không có lịch sử mua hàng.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Dữ liệu hóa đơn (có thể lấy từ props hoặc API)
        bills: [], // Dữ liệu các hóa đơn lấy từ database.json
        userBills: [], // Hóa đơn của người dùng đã đăng nhập
      };
    },
    created() {
      // Lấy dữ liệu từ localStorage và database.json
      this.getUserAndBills();
    },
    methods: {
      getUserAndBills() {
        // Lấy thông tin người dùng từ localStorage
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
          // Nếu không có người dùng đăng nhập, chuyển đến trang login
          this.$router.push("/login");
          return;
        }
  
        // Lấy dữ liệu hóa đơn từ database.json (mô phỏng)
        const data = require('@/json-server/database.json'); // Đảm bảo đường dẫn chính xác đến file database.json
  
        // Lọc các hóa đơn theo userId
        this.userBills = data.bills.filter(bill => bill.userId === currentUser.id);
      },
    },
  };
  </script>

  
  
  <style scoped>
.history {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.history h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.bill {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.bill h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.bill ul {
  list-style: none;
  padding: 0;
}

.bill ul li {
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
}

.bill ul li strong {
  font-weight: bold;
  color: #007bff;
}

.bill div {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}

.bill div strong {
  color: #28a745;
}

.history .no-history {
  font-size: 1rem;
  color: #999;
  text-align: center;
  margin-top: 30px;
}

.history .loading {
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
  margin-top: 20px;
}

</style>
