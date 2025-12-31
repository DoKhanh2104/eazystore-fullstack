package com.devithedev.eazystore.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devithedev.eazystore.dto.ContactDto;
import com.devithedev.eazystore.service.IContactService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/contacts")
public class ContactController {

    private final IContactService iContactService;

    @PostMapping
    public String saveContact(@RequestBody ContactDto contactDto) {
        boolean isSaved = this.iContactService.saveContact(contactDto);
        if (isSaved) {
            return "Request processed successfully";
        } else {
            return "An error occurred. Please try again";
        }
    }

}
