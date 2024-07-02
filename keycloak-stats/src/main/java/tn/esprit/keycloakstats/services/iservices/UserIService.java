package tn.esprit.keycloakstats.services.iservices;
import tn.esprit.keycloakstats.entities.User;

public interface UserIService {
    User getByEMAIL(String email);
    User getByUSERNAME(String username);
}
