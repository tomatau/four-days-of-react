const mockData = [
  { id: '1', title: 'T shirt', inventory: 0, price: 10.00 },
  { id: '2', title: 'Jeans', inventory: 9, price: 2.00 },
  { id: '3', title: 'Magic Ball', inventory: 20, price: 1000.00 },
  { id: '4', title: 'Skipping Rope', inventory: 0, price: 5.00 },
  { id: '5', title: 'Yacht', inventory: 17, price: 100.00 },
  { id: '6', title: 'Mouse', inventory: 200, price: 10.00 },
  { id: '7', title: 'Cat', inventory: 0, price: 11.00 },
  { id: '8', title: 'Long-johns', inventory: 12, price: 60.00 },
  { id: '9', title: 'Super Skipping rope', inventory: 1, price: 76.00 },
  { id: '10', title: 'Pie', inventory: 10000, price: 3.14 },
  { id: '11', title: 'Arkanstone', inventory: 1, price: 75.02 }
];

const ProductsSource = {
  fetch: () => new Promise(resolve => {
    setTimeout(() => resolve(mockData), 500);
  })
};

export default ProductsSource;
