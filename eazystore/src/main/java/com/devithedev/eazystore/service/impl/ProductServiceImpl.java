package com.devithedev.eazystore.service.impl;

import com.devithedev.eazystore.dto.ProductDto;
import com.devithedev.eazystore.entity.Product;
import com.devithedev.eazystore.repository.ProductRepository;
import com.devithedev.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @Cacheable("products")
    @Override
    public Page<ProductDto> getProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage.map(this::transformToDTO);
    }

    private ProductDto transformToDTO(Product product) {
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);
        productDto.setProductId(product.getId());
        return productDto;
    }
}
