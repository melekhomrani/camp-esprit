package tn.esprit.campesprit;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.services.iservices.ForumThreadSvc;

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
    @PreAuthorize ("hasRole('ROLE_ADMIN')")
    public String forUserAdmin() {
        log.info("Test endpoint accessed");
        return "Hello World for ROLE_USER or ROLE_ADMIN";
    }

    @GetMapping(produces = "application/json")
    public String index(@AuthenticationPrincipal Jwt jwt) {
        return String.format("Hello, %s!", jwt.getClaims());
    }

    @Autowired
    private ForumThreadSvc forumThreadSvc;

    // Endpoint to get all threads
    @GetMapping("/threads")
    public List<ForumThread> getAllThreads() {
        return forumThreadSvc.getAllThreads();
    }

    // Endpoint to create a new thread
    @PostMapping("/create/thread")
    public ForumThread createThread(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String userId,
            @RequestParam List<Long> tagIds) {

        ForumThread forumThread = new ForumThread();
        forumThread.setTitle(title);
        forumThread.setContent(content);
        return forumThreadSvc.createThread(forumThread, userId, tagIds);
    }
}
