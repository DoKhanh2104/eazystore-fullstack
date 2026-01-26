package com.devithedev.eazystore.controller;

import com.devithedev.eazystore.dto.ProductDto;
import com.devithedev.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService iProductService;

    @GetMapping
    public ResponseEntity<Page<ProductDto>> getProducts(Pageable pageable) {
        Page<ProductDto> productList = iProductService.getProducts(pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(productList);
    }
}
