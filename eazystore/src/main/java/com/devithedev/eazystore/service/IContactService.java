package com.devithedev.eazystore.service;

import java.util.List;

import com.devithedev.eazystore.dto.ContactDto;
import com.devithedev.eazystore.dto.ContactResponseDto;
import com.devithedev.eazystore.entity.Contact;

public interface IContactService {
    boolean saveContact(ContactDto contactDto);

    List<ContactResponseDto> getOpenAllMessages();

    Contact updateContactStatus(Long contactId, String contactStatus);

}
