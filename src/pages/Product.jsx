import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  const dispatch = useDispatch();

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        fetchSimilarProducts(data.category);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    const fetchSimilarProducts = async (category) => {
      try {
        setLoadingSimilar(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await response.json();
        setSimilarProducts(data);
        setLoadingSimilar(false);
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
      }
    };

    fetchProductData();
  }, [id]);

  const LoadingSkeleton = ({ type }) => {
    if (type === "product") {
      return (
        <div className="loading-product">
          <Skeleton height={400} width={400} className="mb-4" />
          <Skeleton height={30} width={250} className="mb-2" />
          <Skeleton height={90} />
        </div>
      );
    }
    if (type === "similar") {
      return Array(4)
        .fill(0)
        .map((_, index) => (
          <div className="mx-3" key={index}>
            <Skeleton height={300} width={200} />
          </div>
        ));
    }
    return null;
  };

  const ProductDetails = () => (
    <div className="product-details container my-5 py-3">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-muted text-uppercase">{product.category}</h4>
          <h1 className="product-title display-5">{product.title}</h1>
          <p className="rating lead">
            {product.rating?.rate} <i className="fa fa-star text-warning"></i>
          </p>
          <h3 className="price display-6 my-4">${product.price}</h3>
          <p className="description lead">{product.description}</p>
          <div className="actions">
            <button
              className="btn btn-outline-dark"
              onClick={() => addProductToCart(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const SimilarProducts = () => (
    <div className="similar-products py-4">
      <h3 className="mb-4">You May Also Like</h3>
      <Marquee pauseOnHover speed={50}>
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-3 text-center">
            <img
              src={item.image}
              alt={item.title}
              className="card-img-top p-3"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title.substring(0, 20)}...</h5>
              <div className="btn-group">
                <Link
                  to={`/product/${item.id}`}
                  className="btn btn-outline-dark"
                >
                  View
                </Link>
                <button
                  className="btn btn-dark"
                  onClick={() => addProductToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        {loading ? (
          <LoadingSkeleton type="product" />
        ) : (
          product && <ProductDetails />
        )}
        <div className="row my-5">
          {loadingSimilar ? (
            <LoadingSkeleton type="similar" />
          ) : (
            <SimilarProducts />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
