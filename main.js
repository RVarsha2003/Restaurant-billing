const { createApp } = Vue;

createApp({
  data() {
    return {
      restaurantName: "SHIVSAGAR Veg Restaurant",
      showMenu: false,
      showModal: false,
      discount: 0,
      billNumber: this.getInitialBillNumber(),
      currentDate: new Date().toLocaleString(),
      selectedItem: {},
      selectedQty: 1,
      items: [],
      menuItems: [
        { name: "MISAL PAV", price: 85 },
        { name: "BATATA WADA", price: 70 },
        { name: "MEDU WADA", price: 70 },
        { name: "FILTER COFFEE", price: 35 },
        { name: "BUTTER NAAN", price: 30 },
        { name: "CHICKEN BIRYANI", price: 220 },
        { name: "LASSI", price: 60 },
        { name: "COLD COFFEE", price: 70 },
        { name: "VEG PULAO", price: 140 },
        { name: "SPRING ROLL", price: 120 }
      ]
    };
  },
  computed: {
    subtotal() {
      return this.items.reduce((sum, item) => sum + item.qty * item.price, 0);
    },
    gst() {
      return this.subtotal * 0.05;
    },
    total() {
      return this.subtotal - this.discount + this.gst;
    }
  },
  methods: {
    getInitialBillNumber() {
      // Try to fetch from localStorage, fallback to 1
      return parseInt(localStorage.getItem('billNumber')) || 1;
    },
    saveBillNumber() {
      localStorage.setItem('billNumber', this.billNumber.toString());
    },
    getColumnItems(col) {
      const half = Math.ceil(this.menuItems.length / 2);
      return col === 1
        ? this.menuItems.slice(0, half)
        : this.menuItems.slice(half);
    },
    openModal(item) {
      this.selectedItem = item;
      this.selectedQty = 1;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = {};
    },
    addItem() {
      if (this.selectedItem && this.selectedQty > 0) {
        this.items.push({
          name: this.selectedItem.name,
          price: this.selectedItem.price,
          qty: this.selectedQty
        });
        this.closeModal();
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    printBill() {
      window.print();

      // After print: increment bill number
      this.billNumber += 1;
      this.saveBillNumber();

      // Reset for next bill
      this.items = [];
      this.discount = 0;
      this.currentDate = new Date().toLocaleString();
    }
  }
}).mount('#app');
