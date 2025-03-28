<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <input
          id="phone"
          v-model="phone"
          placeholder="Số điện thoại"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Mật khẩu"
          class="form-input"
          required
        />
      </div>
      <button type="submit" class="login-btn">Đăng nhập</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ComLogin",
  data() {
    return {
      phone: "", // Số điện thoại nhập từ người dùng
      password: "", // Mật khẩu nhập từ người dùng
      error: "", // Lỗi hiển thị
    };
  },
  methods: {
    async login() {
      try {
        // Lấy dữ liệu người dùng từ JSON Server
        const { data: users } = await axios.get("http://localhost:3000/users");

        // Tìm người dùng khớp với thông tin đăng nhập
        const user = users.find(
          (u) => u.phone === this.phone && u.password === this.password
        );

        if (user) {
          // Lưu người dùng vào localStorage
          localStorage.setItem("currentUser", JSON.stringify(user));

          // Tự động tải lại trang để cập nhật trạng thái header
          location.reload();
        } else {
          // Thông tin đăng nhập sai
          this.error = "Số điện thoại hoặc mật khẩu không đúng.";
        }
      } catch (err) {
        console.error("Lỗi khi đăng nhập:", err);
        this.error = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #45a049;
}

.error-message {
  color: #f44336;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}
</style>
