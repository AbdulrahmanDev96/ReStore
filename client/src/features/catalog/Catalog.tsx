import agent from "../../app/api/agent";
import {Product} from "./../../app/models/Product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import LoadingComponent from './../../app/layout/LoadingComponent';


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products))
    .then(error => console.log(error))
    .finally(() => setLoading(false))
  }, []);

  if(loading) return <LoadingComponent message="loading Product..."/>

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
