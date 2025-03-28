<template>
    <div v-if="bill">
      <h1>Chi tiết hóa đơn</h1>
      <p>Hóa đơn #{{ bill.id }}</p>
      <p>Ngày mua: {{ bill.date }}</p>
      <p>Tổng tiền: {{ bill.total.toLocaleString() }} VND</p>
      <ul>
        <li v-for="item in bill.items" :key="item.id">
          {{ item.name }} - Size: {{ item.size }} - Giá: {{ item.price.toLocaleString() }} VND - SL: {{ item.quantity }}
        </li>
      </ul>
      <router-link to="/history">Quay lại</router-link>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import axios from "axios";
  
  export default {
    name: "ComBillDetails",
    setup(_, { route }) {
      const bill = ref(null);
  
      const loadBillDetails = async () => {
        const response = await axios.get(`http://localhost:3000/bills/${route.params.id}`);
        bill.value = response.data;
      };
  
      loadBillDetails();
  
      return { bill };
    },
  };
  </script>
  