package tn.esprit.campesprit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@Slf4j
public class TestController {
    @GetMapping
    public String forAll() {
        log.info("Test endpoint accessed");
        return "Hello World for ALl";
    }
    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public String forUserAdmin() {
        log.info("Test endpoint accessed");
        return "Hello World for ROLE_USER or ROLE_ADMIN";
    }

    @GetMapping("/")
    public String index(@AuthenticationPrincipal Jwt jwt) {
        return String.format("Hello, %s!", jwt.getClaims());
    }
}
