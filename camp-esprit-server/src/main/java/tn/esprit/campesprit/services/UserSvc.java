package tn.esprit.campesprit.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.UserEntity;
import tn.esprit.campesprit.repositories.UserRepository;
import tn.esprit.campesprit.services.iservices.UserIService;

@Service
@AllArgsConstructor
public class UserService implements UserIService {

    private final UserRepository userRepository;

    @Override
    public UserEntity getByEMAIL(String email) {
        return userRepository.getByEmail(email);
    }

    @Override
    public UserEntity getByUSERNAME(String username) {
        return userRepository.getByUsername(username);
    }
}
