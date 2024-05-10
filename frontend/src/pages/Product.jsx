import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../components/breadcrums/Breadcrum';
import { ProductDisplay } from '../components/productdisplay/ProductDisplay';
import { DescriptionBox } from '../components/descriptionbox/DescriptionBox';
import { RelatedProducts } from '../components/relatedproducts/RelatedProducts';

export const Product = () => {

  const {all_product} = useContext(ShopContext);
  const {proudctId} = useParams();
  const product = all_product.find((e)=> e.id === Number(proudctId));
  return (
    <div>
        <Breadcrum product={product}/>
        <ProductDisplay product={product}/>
        <DescriptionBox/>
        <RelatedProducts/> 
    </div> 
  )
}
