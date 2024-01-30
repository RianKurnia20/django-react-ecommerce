import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'

// membuat tampilan menggunakan dummy data json products.js
// import products from '../products'

function HomeScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {

        async function fetchProducts() {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/products/');
                setProducts(response.data);
            } catch (error) {
                if (error.response) {
                    // Respons HTTP tetapi dengan status di luar rentang 2xx
                    console.error('Error fetching products - HTTP Error:', error.response.status, error.response.data);
                } else if (error.request) {
                    // Tidak ada respons dari server
                    console.error('Error fetching products - No response from server:', error.request);
                } else {
                    // Kesalahan lainnya
                    console.error('Error fetching products:', error.message);
                }
            }
        }

        fetchProducts();

    }, []);

    return (
        <div>
        <h1>Our Latest Products</h1>
        <Row>
            {products.map(product =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product = {product}></Product>
                </Col>
            ))}
        </Row>
        </div>
    )
}

export default HomeScreen
