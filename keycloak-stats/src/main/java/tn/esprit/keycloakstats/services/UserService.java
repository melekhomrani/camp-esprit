package tn.esprit.keycloakstats.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.keycloakstats.entities.User;
import tn.esprit.keycloakstats.repositories.UserRepository;
import tn.esprit.keycloakstats.services.iservices.UserIService;

import java.util.List;

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

    public List<Object[]> countUsersByEmailVerified() {
        return userRepository.countUsersByEmailVerified();
    }
}
