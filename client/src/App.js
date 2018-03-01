import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

const products = [
  {
    name: 'Fitbit',
    price: '200'
  },
  {
    name: 'Mi Max 2',
    price: '650'
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();

    this.setState({ products: products });
  }

  getProducts() {
    axios.get(`localhost:3090/getdata`).then(res => {
      console.log(res);
    });
    return this.state.products;
  }

  onDelete(name) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });

    console.log(filteredProducts);

    this.setState({
      products: filteredProducts
    });

    axios.delete(`localhost:3090/deletedata/${name}`).then(response => {
      console.log(response);
    });
  }

  onAdd(name, price) {
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    this.setState({ products });

    axios.post('localhost:3090/insertdata', {
      products
    });
  }

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }
      return product;
    });

    this.setState({ products });

    axios.put(`localhost:3090/updatedata/${name}`, {
      products
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>

        <AddProduct onAdd={this.onAdd} />
        {this.state.products.map(product => {
          return (
            <ProductItem
              key={product.name}
              {...product}
              onDelete={this.onDelete}
              onEditSubmit={this.onEditSubmit}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
