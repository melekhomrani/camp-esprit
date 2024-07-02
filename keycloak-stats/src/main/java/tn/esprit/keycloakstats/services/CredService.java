package tn.esprit.keycloakstats.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.keycloakstats.repositories.CredRepo;
import tn.esprit.keycloakstats.services.iservices.CredIService;

import java.util.List;

@Service
@AllArgsConstructor
public class CredService implements CredIService {
    private CredRepo credRepo;

    @Override
    public List<Object[]> countCredsByType() {
        return credRepo.countCredsByType();
    }
}
