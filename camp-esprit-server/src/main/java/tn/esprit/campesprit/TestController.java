package tn.esprit.campesprit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.services.ForumThreadSvc;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@Slf4j
public class TestController {
    @GetMapping("faza")
    public String forAll() {
        log.info("Test endpoint accessed");
        return "Hello World for ALl";
    }
    @GetMapping("/user")
    public String forUser() {
        log.info("Test endpoint accessed");
        return "Hello World for ROLE_USER";
    }
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String forAdmoin() {
        log.info("Test endpoint accessed");
        return "Hello World for ROLE_ADMIN";
    }

    @GetMapping("/user-admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String forUserAdmin() {
        log.info("Test endpoint accessed");
        return "Hello World for ROLE_USER or ROLE_ADMIN";
    }

    @GetMapping(produces = "application/json")
    public String index(@AuthenticationPrincipal Jwt jwt) {
        return String.format("Hello, %s!", jwt.getClaims());
    }

}
