package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.Message;
import tn.esprit.campesprit.repositories.MessageRepository;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getMessagesByChatRoomId(Long chatRoomId) {
        return messageRepository.findByChatRoomId(chatRoomId);
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}
