<template>
  <div class="menu-container">
    <h2>Thực Đơn Trà Sữa</h2>

    <!-- Phần tìm kiếm -->
    <div class="search-container">
      <div class="search-box">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Tìm kiếm theo tên..."
          @input="filterProducts"
        />
      </div>

      <div class="price-filter">
        <select v-model="priceRange" @change="filterProducts">
          <option value="">Tất cả giá</option>
          <option value="0-30000">Dưới 30.000đ</option>
          <option value="30000-50000">30.000đ - 50.000đ</option>
          <option value="50000">Trên 50.000đ</option>
        </select>
      </div>
    </div>

    <!-- Thông báo thêm giỏ hàng thành công -->
    <div v-if="showNotification" class="notification" :class="{ show: showNotification }">
      ✓ Thêm sản phẩm thành công!
    </div>

    <!-- Grid sản phẩm -->
    <div class="products-grid">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>

        <!-- Chọn kích cỡ -->
        <div class="size-selection">
          <div v-for="size in product.size" :key="size" class="size-option">
            <label>
              <input
                type="radio"
                :name="'size-' + product.id"
                :value="size"
                v-model="selectedSizes[product.id]"
              />
              {{ size }} - {{ formatPrice(product.price[size]) }}đ
            </label>
          </div>
        </div>

        <!-- Nút Chi tiết sản phẩm -->
        <button
          class="details-btn"
          @click="goToProductDetail(product.id)"
        >
          Chi tiết sản phẩm
        </button>

        <!-- Nút Thêm vào giỏ và đánh giá -->
        <div class="actions">
          <button
            @click="addToCart(product)"
            :disabled="!selectedSizes[product.id]"
            class="add-to-cart-btn"
          >
            Thêm vào giỏ
          </button>
          <div class="rating">
            <i class="star-icon">⭐</i>
            <span>{{ calculateAverageRating(product.reviews) }} / 5</span>
          </div>
        </div>

        <!-- Lời nhắc đăng nhập -->
        <p v-if="!isLoggedIn" class="login-reminder">
          Bạn cần đăng nhập để thêm sản phẩm.
        </p>
      </div>
    </div>

    <!-- Điều hướng phân trang -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">Trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Sau</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "ComThucDon",
  setup() {
    const products = ref([]);
    const selectedSizes = ref({});
    const searchTerm = ref("");
    const priceRange = ref("");
    const showNotification = ref(false);
    const currentPage = ref(1);
    const productsPerPage = 12;
    const isLoggedIn = ref(!!localStorage.getItem("currentUser"));
    const router = useRouter();

    // Fetch data
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        products.value = response.data;

        // Fetch reviews for each product
        for (const product of products.value) {
          const reviewResponse = await axios.get(`http://localhost:3000/reviews?productId=${product.id}`);
          product.reviews = reviewResponse.data;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Lọc sản phẩm theo tên và giá
    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase());

        if (!matchesSearch) return false;

        if (!priceRange.value) return true;

        const [min, max] = priceRange.value.split("-").map(Number);
        const productMinPrice = Math.min(...Object.values(product.price));

        if (!max) {
          return productMinPrice >= min;
        }

        return productMinPrice >= min && productMinPrice <= max;
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / productsPerPage);
    });

    const paginatedProducts = computed(() => {
      const startIndex = (currentPage.value - 1) * productsPerPage;
      return filteredProducts.value.slice(startIndex, startIndex + productsPerPage);
    });

    const formatPrice = (price) => {
      return new Intl.NumberFormat("vi-VN").format(price);
    };

    const addToCart = (product) => {
      if (!isLoggedIn.value) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return;
      }

      const selectedSize = selectedSizes.value[product.id];
      if (!selectedSize) return;

      const cartItem = {
        id: product.id,
        name: product.name,
        size: selectedSize,
        price: product.price[selectedSize],
        image: product.image,
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

      showNotificationMessage();
    };

    const showNotificationMessage = () => {
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
    };

    // Tính điểm đánh giá trung bình
    const calculateAverageRating = (reviews) => {
      if (!reviews || reviews.length === 0) return "0.0";
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / reviews.length).toFixed(1);
    };

    // Chuyển hướng đến chi tiết sản phẩm
    const goToProductDetail = (id) => {
      router.push(`/product/${id}`);
    };

    // Fetch sản phẩm khi component được mount
    onMounted(fetchProducts);

    return {
      products,
      selectedSizes,
      searchTerm,
      priceRange,
      showNotification,
      currentPage,
      totalPages,
      paginatedProducts,
      formatPrice,
      addToCart,
      isLoggedIn,
      calculateAverageRating,
      goToProductDetail,
    };
  },
};
</script>


<style scoped>
.menu-container {
  padding: 20px;
}

.search-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.search-box input,
.price-filter select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  width: 300px;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 16px 24px;
  border-radius: 4px;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.3s ease;
  z-index: 1000;
}

.notification.show {
  opacity: 1;
  transform: translateX(0);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.size-selection {
  margin: 10px 0;
}

.size-option {
  margin: 5px 0;
}

.add-to-cart-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.pagination button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.login-reminder {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
}

.details-btn {
  background-color: #008cba;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
}

.details-btn:hover {
  background-color: #007bb5;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  color: #FFD700; /* Vàng */
}
</style>
