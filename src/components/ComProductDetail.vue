<template>
    <div class="product-detail-container">
      <!-- Phần chi tiết sản phẩm -->
      <div class="product-info" v-if="product && product.price">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <div class="product-sizes">
            <label v-for="size in Object.keys(product.price)" :key="size" class="size-option">
              <input
                type="radio"
                :name="'size-' + product.id"
                :value="size"
                v-model="selectedSize"
              />
              {{ size }} - {{ formatPrice(product.price[size]) }}đ
            </label>
          </div>
          <button
            @click="addToCart"
            :disabled="!selectedSize || !isLoggedIn"
            class="add-to-cart-btn"
          >
            Thêm vào giỏ hàng
          </button>
          <p v-if="!isLoggedIn" class="login-reminder">Bạn cần đăng nhập để thêm sản phẩm.</p>
        </div>
      </div>
  
      <!-- Phần mô tả -->
      <div class="description-section" v-if="product">
        <h3>Mô tả</h3>
        <p>{{ product.description }}</p>
      </div>
  
      <!-- Khu vực đánh giá -->
      <div class="reviews-section">
        <div class="reviews-header">
          <h3>Đánh giá sản phẩm</h3>
          <button @click="showReviewDialog = true" class="write-review-btn">Viết đánh giá</button>
        </div>
        <div class="reviews-list">
          <div v-for="review in reviews" :key="review.id" class="review-card">
            <p><strong>SĐT:</strong> {{ review.phone }}</p>
            <p><strong>Số sao:</strong> {{ review.rating }}/5</p>
            <p><strong>Nhận xét:</strong> {{ review.text }}</p>
          </div>
        </div>
      </div>
  
      <!-- Hộp thoại viết đánh giá -->
      <div v-if="showReviewDialog" class="review-dialog">
        <div class="dialog-content">
          <h3>Viết đánh giá</h3>
          <label>Số điện thoại:</label>
          <input type="text" v-model="newReview.phone" />
          <label>Đánh giá:</label>
          <div class="rating-container">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ active: newReview.rating >= star }"
              @mouseover="hoverRating = star"
              @mouseleave="hoverRating = newReview.rating"
              @click="newReview.rating = star"
            >
              ★
            </span>
            <span class="rating-text">{{ newReview.rating.toFixed(1) }}/5.0</span>
          </div>
          <label>Nhận xét:</label>
          <textarea v-model="newReview.text" rows="4"></textarea>
          <div class="dialog-actions">
            <button @click="submitReview" class="submit-btn">Gửi</button>
            <button @click="showReviewDialog = false" class="cancel-btn">Hủy</button>
          </div>
        </div>
      </div>
  
      <!-- Thông báo -->
      <div v-if="showNotification" class="notification">
        Đã gửi đánh giá của bạn!
      </div>
      <!-- Thông báo lỗi -->
      <div v-if="showErrorNotification" class="error-notification">
        Số điện thoại không hợp lệ, vui lòng kiểm tra lại!
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    name: "ComProductDetail",
    props: ["productId"],
    setup(props, { emit }) {
      const product = ref({});
      const selectedSize = ref("");
      const isLoggedIn = ref(!!localStorage.getItem("currentUser"));
      const reviews = ref([]);
      const showReviewDialog = ref(false);
      const showNotification = ref(false);
      const showErrorNotification = ref(false);
      const hoverRating = ref(0);
      const newReview = ref({ phone: "", rating: 0, text: "" });
  
      // Fetch sản phẩm
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/products/${props.productId}`
          );
          product.value = response.data;
        } catch (error) {
          console.error("Lỗi khi tải sản phẩm:", error);
        }
      };
  
      // Fetch đánh giá
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/reviews?productId=${props.productId}`
          );
          reviews.value = response.data;
        } catch (error) {
          console.error("Lỗi khi tải đánh giá:", error);
        }
      };
  
      // Lấy giá định dạng
      const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
      };
  
      // Thêm vào giỏ hàng
      const addToCart = () => {
        if (!selectedSize.value) return;
  
        const cartItem = {
          id: product.value.id,
          name: product.value.name,
          size: selectedSize.value,
          price: product.value.price[selectedSize.value],
          image: product.value.image,
          quantity: 1,
        };
  
        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItemIndex = currentCart.findIndex(
          (item) => item.id === cartItem.id && item.size === cartItem.size
        );
  
        if (existingItemIndex !== -1) {
          currentCart[existingItemIndex].quantity += 1;
        } else {
          currentCart.push(cartItem);
        }
  
        localStorage.setItem("cart", JSON.stringify(currentCart));
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Thêm vào giỏ hàng thành công!");
      };
  
      // Gửi đánh giá
      const submitReview = async () => {
        if (!newReview.value.phone || !newReview.value.text || newReview.value.rating === 0) {
          alert("Vui lòng điền đầy đủ thông tin!");
          return;
        }
  
        try {
          // Kiểm tra nếu số điện thoại nhập vào có tồn tại trong danh sách người dùng
          const userResponse = await axios.get(`http://localhost:3000/users?phone=${newReview.value.phone}`);
          if (userResponse.data.length === 0) {
            showErrorNotification.value = true;
            setTimeout(() => {
              showErrorNotification.value = false;
            }, 3000); // Ẩn thông báo sau 3 giây
            return;
          }
  
          const userId = userResponse.data[0].id; // Giả sử bạn có trường `id` trong bảng `users`
  
          // Gửi đánh giá lên server
          const review = {
            phone: newReview.value.phone,
            rating: newReview.value.rating,
            text: newReview.value.text,
            productId: props.productId,
            userId, // Lưu `userId` vào bài đánh giá
          };
  
          await axios.post("http://localhost:3000/reviews", review);
          reviews.value.push(review); // Thêm vào danh sách đánh giá
          newReview.value = { phone: "", rating: 0, text: "" };
          showReviewDialog.value = false;
          showNotification.value = true;
  
          // Gửi sự kiện cho ComThucDon để cập nhật điểm đánh giá
          emit("update-rating", review.rating);
  
          setTimeout(() => {
            showNotification.value = false;
          }, 2000); // Ẩn thông báo sau 2 giây
        } catch (error) {
          console.error("Lỗi khi gửi đánh giá:", error);
        }
      };
  
      // Lấy sản phẩm và đánh giá khi component được mounted
      onMounted(() => {
        fetchProduct();
        fetchReviews();
      });
  
      return {
        product,
        selectedSize,
        isLoggedIn,
        reviews,
        showReviewDialog,
        showNotification,
        showErrorNotification,
        newReview,
        hoverRating,
        fetchProduct,
        fetchReviews,
        formatPrice,
        addToCart,
        submitReview,
      };
    },
  };
  </script>


<style scoped>

.product-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
}

.product-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
}

.product-image {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  max-width: 600px;
  margin-left: 40px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.product-sizes {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.size-option {
  font-size: 1rem;
  margin: 5px 0;
}

.size-option input {
  margin-right: 10px;
}

.add-to-cart-btn {
  padding: 12px 24px;
  background-color: #28a745;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}

.login-reminder {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #e74c3c;
}

.description-section {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
}

.description-section h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.description-section p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.reviews-section {
  width: 100%;
  max-width: 1200px;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.reviews-header h3 {
  font-size: 1.5rem;
  color: #333;
}

.write-review-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.write-review-btn:hover {
  background-color: #0056b3;
}

.reviews-list {
  margin-top: 20px;
}

.review-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.review-card p {
  margin: 5px 0;
  font-size: 1rem;
  color: #333;
}

.review-card strong {
  color: #007bff;
}

.review-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-content h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.dialog-content label {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
}

.dialog-content input,
.dialog-content textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.dialog-content .rating-container {
  display: flex;
  margin-bottom: 15px;
}

.dialog-content .star {
  font-size: 2rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}

.dialog-content .star.active {
  color: #ffcc00;
}

.dialog-content .rating-text {
  font-size: 1rem;
  color: #333;
  margin-left: 10px;
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
}

.dialog-actions .submit-btn,
.dialog-actions .cancel-btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dialog-actions .submit-btn {
  background-color: #28a745;
  color: #fff;
}

.dialog-actions .submit-btn:hover {
  background-color: #218838;
}

.dialog-actions .cancel-btn {
  background-color: #e74c3c;
  color: #fff;
}

.dialog-actions .cancel-btn:hover {
  background-color: #c0392b;
}

.notification,
.error-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  display: none;
  z-index: 999;
}

.error-notification {
  background-color: #e74c3c;
}

.notification.show,
.error-notification.show {
  display: block;
}
</style>
  