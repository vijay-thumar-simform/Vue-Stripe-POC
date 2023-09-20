import { defineStore } from "pinia";

export const store = defineStore({
  id: "counter",
  state: () => ({
    products: [
      { name: 'Albert Einstein', img: '/src/assets//Albert Einstein.jpg', price: 'price_1NnxzQSCHz2dbPtSc94xtHqe', priceAmount: 50 },
      { name: 'Flowers', img: '/src/assets//Flowers.jpg', price: 'price_1NnzLXSCHz2dbPtSTKF9wmD9', priceAmount: 10 },
      { name: 'GreekArt-1', img: '/src/assets//GreekArt-1.jpg', price: 'price_1NnzNLSCHz2dbPtSkdXqNXry', priceAmount: 15 },
      { name: 'GreekArt-2', img: '/src/assets//GreekArt-2.jpg', price: 'price_1NnzOaSCHz2dbPtSoVUPglCa', priceAmount: 20 },
      { name: 'Place-1', img: '/src/assets//Place-1.jpg', price: 'price_1NnzPdSCHz2dbPtSs9PQocg4', priceAmount: 15 },
      { name: 'Place-2', img: '/src/assets//Place-2.jpg', price: 'price_1NnzQgSCHz2dbPtSV7tVE9dd', priceAmount: 20 },
      { name: 'Kid-1', img: '/src/assets//Kid-1.jpg', price: 'price_1NnzRNSCHz2dbPtSHVru7ZZP', priceAmount: 24 },
      { name: 'VaseArt-1', img: '/src/assets//VaseArt-1.jpg', price: "price_1NnzSbSCHz2dbPtSNEjMkIh5", priceAmount: 200 }
    ],
    ordersList: [] as { price: string, quantity: number }[]
  }),
  actions: {
    addOrder(price: string) {
      if (!this.ordersList.find((o) => o.price === price)) {
        this.ordersList.push({ price, quantity: 1 })
      } else {
        this.ordersList.find((o) => o.price === price)!.quantity++
      }
    },
    removeOrder(price: string) {
      if (this.ordersList && this.ordersList.length > 0) {
        const orderIndex = this.ordersList.findIndex((o) => o.price === price)
        if (orderIndex >= 0) {
          if (this.ordersList.length == 1) {
            this.ordersList.length = 0
          } else {
            this.ordersList.splice(orderIndex, 1)
          }
        }
      }
    },
    minusOrder(price: string) {
      if (this.ordersList.length > 0) {
        const order = this.ordersList.find((o) => o.price === price);
        if (order) {
          if (order.quantity > 1) {
            order.quantity--;
          } else {
            this.removeOrder(price);
          }
        }
      }
    },

  },
});
