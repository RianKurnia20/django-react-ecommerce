import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../Components/Rating'
// import products from '../products'
import axios from 'axios'

export default function ProductScreen() {
    const { id } = useParams();
    // Initialize product state with null or an empty object
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Error fetching product - HTTP Error:', error.response.status, error.response.data);
                } else if (error.request) {
                    console.error('Error fetching product - No response from server:', error.request);
                } else {
                    console.error('Error fetching product:', error.message);
                }
            }
        }

        fetchProduct();
    }, [id]); // Add id as a dependency

    if (!product) {
        return <p>Loading...</p>; // You can add a loading indicator here
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-2'>Back to Home</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text = {` ${product.numReviews} reviews`} color = {'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Desctription: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock':'Sold Out'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='w-100' disabled={product.countInStock == 0} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}
