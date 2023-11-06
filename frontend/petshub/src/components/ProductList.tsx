import ProductMiniView from './ProductMiniView';
import { Flex } from 'native-base';
import React from 'react';

export default function ProductList({ products }) {
  return (
    <Flex direction='row' gap='3' wrap='wrap' justifyContent='center'>
      {products.map((product) => (
        <ProductMiniView product={product} key={product.productId}></ProductMiniView>
      ))}
    </Flex>
  );
}
