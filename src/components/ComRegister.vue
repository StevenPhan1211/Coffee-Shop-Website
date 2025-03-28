<template>
  <div class="register-container">
    <h2 class="title">Đăng Ký Tài Khoản Mới</h2>

    <!-- Hiển thị thông báo lỗi -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <!-- Hiển thị thông báo thành công -->
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Tên Đăng Nhập</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="phone">Số Điện Thoại</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Mật Khẩu</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Xác Nhận Mật Khẩu</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>

      <button type="submit" class="register-btn">Đăng Ký</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ComRegister",
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      // Kiểm tra các điều kiện cần thiết
      if (!this.name || !this.phone || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = "Tất cả các trường đều phải được điền đầy đủ!";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu và xác nhận mật khẩu không khớp!";
        return;
      }

      // Kiểm tra cú pháp email và số điện thoại
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^[0-9]{10}$/;
      
      if (!emailPattern.test(this.email)) {
        this.errorMessage = "Email không hợp lệ!";
        return;
      }

      if (!phonePattern.test(this.phone)) {
        this.errorMessage = "Số điện thoại không hợp lệ!";
        return;
      }

      // Tạo đối tượng người dùng mới
      const newUser = {
        id: Date.now().toString(), // Tạo ID tự động
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
      };

      try {
        // Gửi yêu cầu POST đến json-server để thêm người dùng mới
        const response = await axios.post("http://localhost:3000/users", newUser);
        
        if (response.status === 201) {
          this.successMessage = "Đăng ký thành công!";
          
          // Sau khi đăng ký thành công, điều hướng đến trang đăng nhập
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 2000);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi đăng ký:", error);
        this.errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-btn {
  width: 100%;
  padding: 10px;
  background-color: #ff7a59;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
}

.register-btn:hover {
  background-color: #ff5c3d;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
}
</style>
