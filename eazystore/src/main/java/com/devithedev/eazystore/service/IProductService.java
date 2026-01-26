package com.devithedev.eazystore.service;

import com.devithedev.eazystore.dto.ProductDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {

    Page<ProductDto> getProducts(Pageable pageable);
}
