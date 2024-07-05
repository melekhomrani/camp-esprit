package tn.esprit.campesprit.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.User;
import tn.esprit.campesprit.services.UserSvc;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class UserCtrl {

    private final UserSvc userService;

    @GetMapping("infos")
    public User getUserInfos(@AuthenticationPrincipal Jwt jwt) {
        var username = jwt.getClaimAsString("preferred_username");
        log.info("User with username {} accessed his infos", username);
        var user = userService.getByUSERNAME(username);
        log.info("User {} accessed his infos", user);
        return user;
    }

    @GetMapping("/user/{username}")
    public User getUserByUsername(@PathVariable String username){
        return userService.getByUSERNAME(username);
    }
}