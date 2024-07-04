package tn.esprit.keycloakstats.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.keycloakstats.dto.StatsResponse;
import tn.esprit.keycloakstats.dto.IsEmailVerifResponse;
import tn.esprit.keycloakstats.entities.User;
import tn.esprit.keycloakstats.services.iservices.CredIService;
import tn.esprit.keycloakstats.services.iservices.EventIService;
import tn.esprit.keycloakstats.services.iservices.UserIService;

import java.util.List;
import java.util.stream.Collectors;

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
    @GetMapping("/users/infos")
    public User getUserInfos(@AuthenticationPrincipal Jwt jwt) {
        var username = jwt.getClaimAsString("preferred_username");
        log.info("User with username {} accessed his infos", username);
        var user = userService.getByUSERNAME(username);
        log.info("User {} accessed his infos", user);
        return user;
    }

    @GetMapping("/users/countByEmailVerified")
    public List<IsEmailVerifResponse> countUsersByEmailVerified() {
        return convertToIsEmailVerifResponse(userService.countUsersByEmailVerified());
    }

    //    Events stats
    @GetMapping("/events/countByType")
    public List<StatsResponse> countEventsByType() {
        return convertToStatsResponse(eventService.countEventsByType());
    }

    @GetMapping("/events/countByIpAddress")
    public List<StatsResponse> countEventsByIpAddress() {
        return convertToStatsResponse(eventService.countEventsByIpAddress());
    }

    @GetMapping("/events/countByUserId")
    public List<StatsResponse> countEventsByUserId() {
        return convertToStatsResponse(eventService.countEventsByUserId());
    }

    @GetMapping("/events/countByRealmId")
    public List<StatsResponse> countEventsByRealmId() {
        return convertToStatsResponse(eventService.countEventsByRealmId());
    }

    //    Creds stats
    @GetMapping("/creds/countByType")
    public List<StatsResponse> countCredsByType() {
        return convertToStatsResponse(credService.countCredsByType());
    }

    static List<StatsResponse> convertToStatsResponse(List<Object[]> stats) {
        return stats.stream().map(stat -> new StatsResponse((String) stat[0], (Number) stat[1])).collect(Collectors.toList());
    }

    static List<IsEmailVerifResponse> convertToIsEmailVerifResponse(List<Object[]> stats) {
//        map each object and if the first element is 0 return it as "email not verified" else return "email verified"
        return stats.stream().map(stat -> new IsEmailVerifResponse((Byte) stat[0] == 1 ? "email verified" : "email not verified", (Number) stat[1])).collect(Collectors.toList());
    }
}

// this is a comment for a test commit