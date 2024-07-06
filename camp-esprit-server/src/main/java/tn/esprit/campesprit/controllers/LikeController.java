package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.services.LikeSvc;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeSvc likeSvc;

    @GetMapping("/count/{threadId}")
    public int countLikes(@PathVariable Long threadId) {
        return likeSvc.countLikesByThreadId(threadId);
    }

    @PostMapping("/like/{threadId}")
    public void likeThread(@RequestParam String userId, @PathVariable Long threadId) {
        likeSvc.likeThread(userId, threadId);
    }
}
