package tn.esprit.keycloakstats.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.keycloakstats.entities.User;
import tn.esprit.keycloakstats.services.iservices.CredIService;
import tn.esprit.keycloakstats.services.iservices.EventIService;
import tn.esprit.keycloakstats.services.iservices.UserIService;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class StatCtrl {

    private final UserIService userService;
    private final EventIService eventService;
    private final CredIService credService;

    //    Users stats
    @GetMapping("/users/infossss")
    public User getUserInfos(@AuthenticationPrincipal Jwt jwt) {
        var username = jwt.getClaimAsString("preferred_username");
        log.info("User with username {} accessed his infos", username);
        var user = userService.getByUSERNAME(username);
        log.info("User {} accessed his infos", user);
        return user;
    }

    //    Events stats
    @GetMapping("/events/countByType")
    public List<Object[]> countEventsByType() {
        return eventService.countEventsByType();
    }

    @GetMapping("/events/countByIpAddress")
    public List<Object[]> countEventsByIpAddress() {
        return eventService.countEventsByIpAddress();
    }

    @GetMapping("/events/countByUserId")
    public List<Object[]> countEventsByUserId() {
        return eventService.countEventsByUserId();
    }

    @GetMapping("/events/countByRealmId")
    public List<Object[]> countEventsByRealmId() {
        return eventService.countEventsByRealmId();
    }

    //    Creds stats
    @GetMapping("/creds/countByType")
    public List<Object[]> countCredsByType() {
        return credService.countCredsByType();
    }
}

// this is a comment for a test commit