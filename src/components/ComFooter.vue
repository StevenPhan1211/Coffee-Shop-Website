<template>
    <footer>
        <div class="footer-container">
            <!-- Cột bên trái -->
            <div class="footer-column">
                <h3>Đây là một tiệm trà sữa ngon</h3>
                <p>Địa chỉ: 456 Đường Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh</p>
            </div>

            <!-- Cột bên phải -->
            <div class="footer-column">
                <h3>Liên hệ</h3>
                <p>Email: thebestmilktea@gmail.com</p>
                <p>Điện thoại: 0987-654-321</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style>
footer {
    background-color: #4c4c4c; /* Nền footer màu xám đậm */
    color: #fff; /* Chữ màu trắng */
    padding: 30px 20px;
    font-family: Arial, sans-serif;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1100px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 20px;
}

.footer-column {
    flex: 1;
    min-width: 250px; /* Đảm bảo cột hiển thị đẹp trên màn hình nhỏ */
    box-sizing: border-box;
}

.footer-column h3 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #fcb034; /* Tiêu đề màu cam */
}

.footer-column p {
    margin: 5px 0;
    line-height: 1.6;
}

/* Điều chỉnh bố cục trên màn hình nhỏ */
@media screen and (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        text-align: center;
    }

    .footer-column {
        margin-bottom: 20px;
    }
}
</style>
