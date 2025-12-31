package com.devithedev.eazystore.service;

import com.devithedev.eazystore.dto.ContactDto;

public interface IContactService {
    boolean saveContact(ContactDto contactDto);
}
