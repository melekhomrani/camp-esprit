package tn.esprit.campesprit.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.User;
import tn.esprit.campesprit.repositories.UserRepo;
import tn.esprit.campesprit.services.iservices.UserIService;

@Service
@AllArgsConstructor
public class UserSvc implements UserIService {

    private final UserRepo userRepository;

    @Override
    public User getByEMAIL(String email) {
        return userRepository.getByEmail(email);
    }

    @Override
    public User getByUSERNAME(String username) {
        return userRepository.getByUsername(username);
    }

    public User getUserById(String id){
        return userRepository.getById(id);
    }
}
