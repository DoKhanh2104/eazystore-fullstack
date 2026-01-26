package com.devithedev.eazystore.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.devithedev.eazystore.constants.ApplicationConstants;
import com.devithedev.eazystore.dto.ContactDto;
import com.devithedev.eazystore.dto.ContactInfoDto;
import com.devithedev.eazystore.dto.ContactResponseDto;
import com.devithedev.eazystore.entity.Contact;
import com.devithedev.eazystore.exception.ResourceNotFoundException;
import com.devithedev.eazystore.repository.ContactRepository;
import com.devithedev.eazystore.service.IContactService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {

    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactDto contactDto) {
        Contact contact = transformEntity(contactDto);
        contact.setStatus(ApplicationConstants.OPEN_MESSAGE);
        this.contactRepository.save(contact);
        return true;
    }

    private Contact transformEntity(ContactDto contactDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactDto, contact);
        return contact;
    }

    // Get all contact for admin
    @Override
    public List<ContactResponseDto> getOpenAllMessages() {
        List<Contact> contacts = contactRepository.findByStatus(ApplicationConstants.OPEN_MESSAGE);
        return contacts.stream().map(this::mapToContactResponseDTO).collect(Collectors.toList());
    }

    private ContactResponseDto mapToContactResponseDTO(Contact contact) {
        ContactResponseDto contactResponseDto = new ContactResponseDto(contact.getId(), contact.getName(),
                contact.getEmail(), contact.getMobileNumber(), contact.getMessage(), contact.getStatus());
        return contactResponseDto;
    }

    // Update status for contact status
    @Override
    public Contact updateContactStatus(Long contactId, String contactStatus) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact",
                        "ContactId", contactId.toString()));
        contact.setStatus(contactStatus);
        return contactRepository.save(contact);
    }

}
