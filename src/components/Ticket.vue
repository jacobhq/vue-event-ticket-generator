<template>
  <div class="ticket">
    <div class="ticket-column-1">
      <div>
        <h6 class="ticket-heading">{{ event.name }}</h6>
        <p class="ticket-info">{{ event.organiser }}</p>
      </div>
      <div>
        <span class="ticket-price">£{{ event.price }}</span>
        <span>&nbsp;</span>
      </div>
    </div>
    <div class="ticket-column-2">
      <div class="ticket-qr">
        <qrcode-vue
          :value="ticket.id"
          background="#0b3954"
          foreground="#20fc8f"
          size="100"
          level="H"
        ></qrcode-vue>
      </div>
      <p class="ticket-code">ID: {{ ticket.id }}</p>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "Ticket",
  props: {
    event: Object,
    ticket: Object,
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style scoped>
.ticket {
  background-color: #0b3954;
  color: #fff;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.ticket-column-1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 5px;
}

.ticket-heading {
  margin: 0;
  font-size: 20px;
  color: #20fc8f;
}

.ticket-info {
  margin: 0;
  margin-top: 10px;
}

.ticket-price {
  font-size: 30px;
}

.ticket-column-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ticket-qr {
  width: 100px;
  height: 100px;
}

.ticket-code {
  margin: 0;
  margin-top: 5px;
}
</style>
