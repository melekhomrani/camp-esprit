package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.services.ForumThreadSvc;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ThreadController {
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
