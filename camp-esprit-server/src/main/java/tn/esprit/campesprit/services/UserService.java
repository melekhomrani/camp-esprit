package tn.esprit.campesprit.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.User;
import tn.esprit.campesprit.repositories.UserRepository;
import tn.esprit.campesprit.services.iservices.UserIService;

@Service
@AllArgsConstructor
public class UserService implements UserIService {

    private final UserRepository userRepository;

    @Override
    public User getByEMAIL(String email) {
        return userRepository.getByEmail(email);
    }

    @Override
    public User getByUSERNAME(String username) {
        return userRepository.getByUsername(username);
    }
}
