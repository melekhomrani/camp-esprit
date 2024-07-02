package tn.esprit.keycloakstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.keycloakstats.entities.Event;

import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {

    @Query("SELECT e.type, COUNT(e) FROM Event e GROUP BY e.type")
    List<Object[]> countEventsByType();

    @Query("SELECT e.realmId, COUNT(e) FROM Event e GROUP BY e.realmId")
    List<Object[]> countEventsByRealmId();

    @Query("SELECT e.userId, COUNT(e) FROM Event e GROUP BY e.userId ORDER BY COUNT(e) DESC")
    List<Object[]> countEventsByUserId();

    @Query("SELECT e.ipAddress, COUNT(e) FROM Event e GROUP BY e.ipAddress ORDER BY COUNT(e) DESC")
    List<Object[]> countEventsByIpAddress();
}
