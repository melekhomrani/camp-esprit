package tn.esprit.campesprit.services.iservices;

import tn.esprit.campesprit.entities.User;

public interface UserIService {
    User getByEMAIL(String email);
    User getByUSERNAME(String username);
}
