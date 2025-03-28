<template>
  <div class="lien-he-container">
    <h1 class="lien-he-title">Gửi góp ý</h1>
    <form @submit.prevent="handleSubmit" class="lien-he-form">
      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input
          type="text"
          id="phone"
          v-model="phone"
          placeholder="Nhập số điện thoại của bạn"
          class="form-control"
        />
        <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
      </div>

      <div class="form-group">
        <label for="feedback">Nội dung góp ý:</label>
        <textarea
          id="feedback"
          v-model="feedback"
          placeholder="Nhập nội dung góp ý"
          rows="5"
          class="form-control"
        ></textarea>
        <p v-if="errors.feedback" class="error-message">{{ errors.feedback }}</p>
      </div>

      <button type="submit" class="submit-button">Gửi góp ý</button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "ComLienHe",
  data() {
    return {
      phone: "",
      feedback: "",
      errors: {
        phone: "",
        feedback: "",
      },
      successMessage: "",
    };
  },
  methods: {
    validateForm() {
      let valid = true;

      // Kiểm tra số điện thoại
      if (!this.phone) {
        this.errors.phone = "Vui lòng nhập số điện thoại.";
        valid = false;
      } else if (!/^\d{10,}$/.test(this.phone)) {
        this.errors.phone = "Số điện thoại phải chứa ít nhất 10 chữ số.";
        valid = false;
      } else {
        this.errors.phone = "";
      }

      // Kiểm tra nội dung góp ý
      if (!this.feedback) {
        this.errors.feedback = "Vui lòng nhập nội dung góp ý.";
        valid = false;
      } else {
        this.errors.feedback = "";
      }

      return valid;
    },
    handleSubmit() {
      if (this.validateForm()) {
        // Reset thông báo lỗi
        this.errors = { phone: "", feedback: "" };

        // Hiển thị thông báo gửi thành công
        this.successMessage = "Cảm ơn bạn! Góp ý của bạn đã được gửi.";

        // Xóa dữ liệu sau khi gửi
        this.phone = "";
        this.feedback = "";

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.lien-he-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.lien-he-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.lien-he-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea.form-control {
  resize: none;
}

.submit-button {
  background-color: #ff7a59;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e06646;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.success-message {
  margin-top: 15px;
  color: green;
  font-size: 1rem;
  text-align: center;
}
</style>
