package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import tn.esprit.campesprit.entities.Message;
import tn.esprit.campesprit.services.MessageService;

import java.time.LocalDateTime;

@Controller
public class WebSocketController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        message.setTimestamp(LocalDateTime.now());
        messageService.saveMessage(message);
        return message;
    }
}

