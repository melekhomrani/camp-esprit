package tn.esprit.keycloakstats.services.iservices;

import java.util.List;

public interface EventIService {
    List<Object[]> countEventsByType();
    List<Object[]> countEventsByIpAddress();
    List<Object[]> countEventsByUserId();
    List<Object[]> countEventsByRealmId();

}
