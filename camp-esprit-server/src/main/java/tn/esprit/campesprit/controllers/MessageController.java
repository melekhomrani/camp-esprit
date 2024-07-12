package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.Message;
import tn.esprit.campesprit.services.MessageService;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message saveMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }
}
