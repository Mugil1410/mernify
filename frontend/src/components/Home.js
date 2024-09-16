import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo)=>{
    setCurrentPage(pageNo);
    
  }

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(getProducts(null, null, null, currentPage,null));
  }, [error, dispatch, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Home"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
          <div className="row">
          <div className="col-6 col-md-9">
            <div className="row">
                {products &&
                    products.map((product) => (
                    <Product col={4} key={product._id} product={product} />
                    ))}
            </div>
          </div>
        </div>
          </section>
          {productsCount> 0 && productsCount > resPerPage ?
            <div className="d-flex justify-content-center mt-5">
            <Pagination 
              activePage={currentPage}
              onChange={setCurrentPageNo}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage} 
              nextPageText={'Next'}
              firstPageText={"First"}
              lastPageText={'Last'}
              itemClass={'page-item'}
              linkClass={'page-link'}
              />
          </div>
             :null}
          
        </>
      )}
    </>
  );
};

export default Home;
