<template>
  <div class="gioi-thieu-container">
    <section class="gioi-thieu-section">
      <h1 class="gioi-thieu-title">Giới thiệu về Tiệm Trà Sữa</h1>
      <p class="gioi-thieu-text">
        <strong>Đây là một tiệm trà sữa ngon</strong> được thành lập vào năm 2015 tại trung tâm thành phố. 
        Ban đầu, chỉ là một cửa hàng nhỏ, chúng tôi không ngừng nỗ lực phát triển và mở rộng để mang đến 
        những ly trà sữa tươi ngon cho mọi khách hàng.
      </p>
      <p class="gioi-thieu-text">
        Với phương châm <strong>"Chất lượng - Đổi mới - Tận tâm"</strong>, chúng tôi đã trở thành một trong những 
        thương hiệu trà sữa được yêu thích nhất. Mỗi sản phẩm đều được chế biến từ nguyên liệu tự nhiên, an toàn và 
        hương vị độc đáo, kết hợp cùng không gian quán hiện đại và thân thiện.
      </p>
      <p class="gioi-thieu-text">
        Hiện tại, <strong>Tiệm Trà Sữa Ngọt Ngào</strong> đã có hơn 20 chi nhánh trên toàn quốc và luôn không ngừng 
        cải tiến để mang lại trải nghiệm tốt nhất cho khách hàng.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "ComGioiThieu",
};
</script>

<style scoped>
.gioi-thieu-container {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  margin: 0 auto;
  max-width: 800px; /* Giới hạn chiều rộng để giữ bố cục gọn gàng */
  line-height: 1.6; /* Dãn dòng để dễ đọc hơn */
}

.gioi-thieu-section {
  text-align: left;
}

.gioi-thieu-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #ff7a59; /* Màu nổi bật cho tiêu đề */
}

.gioi-thieu-text {
  font-size: 1rem;
  margin-bottom: 15px;
  text-align: justify; /* Căn chỉnh văn bản cho đẹp mắt */
}
</style>
