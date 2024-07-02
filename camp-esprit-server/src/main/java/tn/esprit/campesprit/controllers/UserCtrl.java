package tn.esprit.campesprit.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.campesprit.entities.UserEntity;
import tn.esprit.campesprit.services.UserService;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    @GetMapping("infos")
    public UserEntity getUserInfos(@AuthenticationPrincipal Jwt jwt) {
        var username = jwt.getClaimAsString("preferred_username");
        log.info("User with username {} accessed his infos", username);
        var user = userService.getByUSERNAME(username);
        log.info("User {} accessed his infos", user);
        return user;
    }
}