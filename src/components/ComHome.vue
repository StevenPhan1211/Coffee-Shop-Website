<template>
  <div class="home-container">
    <!-- Header Section -->
    <section class="header-section">
      <div class="header-content">
        <h1 class="main-title">Đây là một tiệm trà sữa ngon hân hạnh phục vụ</h1>
        <p class="subtitle">
          Trải nghiệm hương vị ngọt ngào với những loại trà sữa đặc biệt nhất!
        </p>
      </div>
      <img src="/images/banner.jpg" alt="Tea Banner" class="header-image" />
    </section>

    <!-- Featured Section -->
    <section class="featured-section">
      <h2 class="section-title">--------------------- Về Chúng Tôi -----------------------</h2>
      <p class="section-description">
        Chúng tôi mang đến cho bạn những ly trà sữa tươi ngon, được chế biến từ 
        những nguyên liệu tốt nhất và công thức đặc biệt.
      </p>
      <div class="features">
        <div class="feature-item">
          <img src="/images/quality.jpg" alt="Quality" class="feature-image" />
          <h3>Chất lượng cao</h3>
          <p>Nguyên liệu được chọn lọc kỹ càng, an toàn sức khỏe.</p>
        </div>
        <div class="feature-item">
          <img src="/images/variety.jpg" alt="Variety" class="feature-image" />
          <h3>Đa dạng</h3>
          <p>Hàng chục hương vị trà sữa cho bạn lựa chọn.</p>
        </div>
        <div class="feature-item">
          <img src="/images/service.jpg" alt="Service" class="feature-image" />
          <h3>Dịch vụ tốt nhất</h3>
          <p>Chúng tôi luôn phục vụ với nụ cười và tận tâm.</p>
        </div>
      </div>
    </section>

    <!-- Best Seller Section -->
    <section class="best-seller-section">
      <h2 class="section-title">-------------------- Sản phẩm bán chạy --------------------</h2>
      <div class="best-seller-grid">
        <div
          v-for="product in bestSellers"
          :key="product.id"
          class="best-seller-item"
        >
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">Giá: {{ formatPrice(product.price) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ComHome",
  data() {
    return {
      bestSellers: [
        {
          id: "1",
          name: "Trà Sữa Truyền Thống",
          image: "/images/boba.jpg",
          price: 20000,
        },
        {
          id: "2",
          name: "Trà Sữa Matcha",
          image: "/images/matcha.jpg",
          price: 50000,
        },
        {
          id: "3",
          name: "Trà Sữa thạch trái cây",
          image: "/images/fruit-tea.jpg",
          price: 35000,
        },
        {
          id: "4",
          name: "Trà Sữa chôm chôm",
          image: "/images/rambutan-tea.jpg",
          price: 45000,
        },
      ],
    };
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
};
</script>

<style scoped>
.home-container {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(to right, #ffecd2, #fcb69f);
}

.header-content {
  max-width: 50%;
}

.main-title {
  font-size: 2.5rem;
  margin: 0;
}

.subtitle {
  font-size: 1.2rem;
  margin: 10px 0;
}

.cta-button {
  padding: 10px 20px;
  background-color: #ff7a59;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.header-image {
  max-width: 45%;
  border-radius: 10px;
}

.featured-section {
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.section-description {
  font-size: 1.2rem;
  margin: 0 auto 30px; /* Căn giữa và tạo khoảng cách */
  max-width: 600px; /* Giới hạn chiều rộng để nội dung không quá dài */
}

.features {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.feature-item {
  text-align: left;
  flex: 1;
}

.feature-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.best-seller-section {
  padding: 40px 20px;
  background-color: #fff;
}

.best-seller-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.best-seller-item {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.product-name {
  font-size: 1.1rem;
  margin: 10px 0;
}

.product-price {
  font-size: 1rem;
  color: #888;
}

.buy-button {
  background-color: #ff7a59;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
