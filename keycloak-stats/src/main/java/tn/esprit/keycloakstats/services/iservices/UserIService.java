package tn.esprit.keycloakstats.services.iservices;
import tn.esprit.keycloakstats.entities.User;

import java.util.List;

public interface UserIService {
    User getByEMAIL(String email);
    User getByUSERNAME(String username);
    List<Object[]> countUsersByEmailVerified();
}
