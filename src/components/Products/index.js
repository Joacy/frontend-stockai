import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Table, Row, Col, Modal } from 'react-bootstrap';

import {
    FiPackage,
    FiTrash2,
    FiPlusCircle,
    FiSearch
} from "react-icons/fi";

import Header from '../Header';

import api from '../../services/api';

import './styles.css';

function RegisterProductModal (props) {
    const history = useHistory();

    const userId = localStorage.getItem('userId');

    const [product_code, setProductCode] = useState('');
    const [product_name, setProductName] = useState('');
    const [product_qtd, setProductQtd] = useState('');
    const [product_buy_value, setProductBuyValue] = useState('');
    const [product_sale_value, setProductSaleValue] = useState('');
    const [product_life, setProductLife] = useState('');

    async function handleRegisterProduct (e) {
        e.preventDefault();

        const data = {
            product_code,
            product_name,
            product_qtd,
            product_buy_value,
            product_sale_value,
            product_life,
        };

        try {
            const response = await api.post(`${userId}/produto`, data);

            history.push('/home');
        } catch (error) {
            alert('Falha no cadastro de produto, tente novamente');
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Cadastrar produto
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h5>Informações sobre o produto</h5>

                <form onSubmit={handleRegisterProduct}>
                    <h6>Código</h6>
                    <input
                        type="text"
                        value={product_code}
                        onChange={e => setProductCode(e.target.value)}
                        required
                    />

                    <h6>Nome</h6>
                    <input
                        type="text"
                        value={product_name}
                        onChange={e => setProductName(e.target.value)}
                        required
                    />

                    <h6>Quantidade</h6>
                    <input
                        type="text"
                        value={product_qtd}
                        onChange={e => setProductQtd(e.target.value)}
                        required
                    />

                    <h6>Valor unitário</h6>
                    <input
                        type="text"
                        value={product_buy_value}
                        onChange={e => setProductBuyValue(e.target.value)}
                        required
                    />

                    <h6>Valor de venda</h6>
                    <input
                        type="text"
                        value={product_sale_value}
                        onChange={e => setProductSaleValue(e.target.value)}
                        required
                    />

                    <h6>Data de validade</h6>
                    <input
                        type="date"
                        value={product_life}
                        onChange={e => setProductLife(e.target.value)}
                        required
                    />

                    <button type="submit">Cadastrar</button>
                </form>
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

export default function Products () {
    const [modalShow, setModalShow] = useState(false);
    const [products, setProducts] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.get(`${userId}/produto`).then(response => {
            setProducts(response.data);
        })
    }, [userId]);

    async function handleDeleteProduct (id) {
        try {
            await api.delete(`${userId}/produto/${id}`);

            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            alert('Erro ao deletar produto, tente novamente.')
        }
    }

    var productList = products.map(product => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.product_code}</td>
            <td>{product.product_name}</td>
            <td>{product.product_qtd}</td>
            <td>{product.product_buy_value}</td>
            <td>{product.product_sale_value}</td>
            <td>{product.product_life}</td>
            <td><FiTrash2 onClick={() => handleDeleteProduct(product.id)} /></td>
        </tr>
    ));

    return (
        <div className="products-panel">
            <Header />

            <span className='page'><FiPackage /> <h2>Produtos</h2></span>

            <div className="product-box">
                <h4>Overview</h4>

                <h2>Meus Produtos</h2>

                <div className="search-add">
                    <Row>
                        <Col sm={12} md={6}>
                            <div className="search-input">
                                <input type="text" name="search-product" id="search-product" placeholder="Buscar produto" />
                                <FiSearch />
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <button onClick={() => setModalShow(true)}><FiPlusCircle /> Cadastrar produto</button>
                        </Col>
                    </Row>
                </div>

                <RegisterProductModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Valor Unitário</th>
                            <th>Valor Venda</th>
                            <th>Data de Validade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList}

                        {/* <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Table cell</td>
                            <td>Molho de Tomate - Tarantella</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td><FiTrash2 /></td>
                        </tr> */}

                    </tbody>
                </Table>
            </div>
        </div>
    );
}