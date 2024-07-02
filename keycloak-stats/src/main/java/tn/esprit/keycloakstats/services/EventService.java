package tn.esprit.keycloakstats.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.keycloakstats.repositories.EventRepo;
import tn.esprit.keycloakstats.services.iservices.EventIService;

import java.util.List;

@Service
@AllArgsConstructor
public class EventService implements EventIService {
    private EventRepo eventRepo;

    @Override
    public List<Object[]> countEventsByType() {
        return eventRepo.countEventsByType();
    }

    @Override
    public List<Object[]> countEventsByIpAddress() {
        return eventRepo.countEventsByIpAddress();
    }

    @Override
    public List<Object[]> countEventsByUserId() {
        return eventRepo.countEventsByUserId();
    }

    @Override
    public List<Object[]> countEventsByRealmId() {
        return eventRepo.countEventsByRealmId();
    }
}
