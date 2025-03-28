<template>
  <div class="news-container">
    <!-- Tin tức -->
    <div v-for="news in paginatedNews" :key="news.id" class="news-item">
      <h2 @click="openDialog(news)" class="news-title">{{ news.title }}</h2>
      <p class="news-summary">{{ news.summary }}</p>
    </div>

    <!-- Phân trang -->
    <div class="pagination">
      <button
        v-if="currentPage > 1"
        @click="changePage(currentPage - 1)"
        class="pagination-btn"
      >
        Trang trước
      </button>
      <button
        v-if="currentPage < totalPages"
        @click="changePage(currentPage + 1)"
        class="pagination-btn"
      >
        Trang sau
      </button>
    </div>

    <!-- Hộp thoại hiển thị tin tức chi tiết -->
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <h2>{{ selectedNews.title }}</h2>
        <p>{{ selectedNews.content }}</p>
        <button @click="closeDialog" class="close-btn">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComTinTuc",
  data() {
    return {
      currentPage: 1,
      newsList: [
        {
          id: 1,
          title: "Black Friday siuuu saleeeee",
          summary: "Đại hạ giá cuối năm",
          content: "Giảm 99% và mua 1 tặng 1 cho 69 người đầu tiên",
        },
        {
          id: 2,
          title: "Sự kiện Giáng sinh chill cùng tà tữa",
          summary: "Ưu đãi đặc biệt cho các cặp đôi",
          content: "Mua 2 tặng 1 trong 2 ngày 24, 25/12/2024",
        },
        {
          id: 3,
          title: "Đón xuân về tôi nhớ xuân xưa...",
          summary: "Mua nước tặng vé là thật???",
          content: "Mua nước tặng vé xe lửa áp dụng cho 500 khách hàng đầu tiên",
        },
        {
          id: 4,
          title: "Quán trà sữa khai trương",
          summary: "Ngày đầu mở bán thuận lợi",
          content: "Quán thu về 699 triệu ngay ngày đầu mở bán trà sữa",
        },
        {
          id: 5,
          title: "Tin tức 5",
          summary: "Tóm tắt về tin tức 5...",
          content: "Chi tiết tin tức 5...",
        },
        {
          id: 6,
          title: "Tin tức 6",
          summary: "Tóm tắt về tin tức 6...",
          content: "Chi tiết tin tức 6...",
        },
      ],
      showDialog: false,
      selectedNews: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.newsList.length / 3); // Mỗi trang có tối đa 3 tin tức
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * 3;
      const end = start + 3;
      return this.newsList.slice(start, end);
    },
  },
  methods: {
    openDialog(news) {
      this.selectedNews = news;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.selectedNews = null;
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.news-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.news-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.news-title {
  font-size: 1.6rem;
  color: #333;
  cursor: pointer;
  margin-bottom: 5px;
}

.news-summary {
  font-size: 1rem;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-btn {
  background-color: #ff7a59;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
}

.dialog-content h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.dialog-content p {
  font-size: 1rem;
  color: #333;
}

.close-btn {
  background-color: #ff7a59;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
