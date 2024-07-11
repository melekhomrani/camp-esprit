package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
