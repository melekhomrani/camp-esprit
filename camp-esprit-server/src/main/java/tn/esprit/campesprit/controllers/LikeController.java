package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.services.LikeSvc;

import java.util.List;

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

    // Unlike a thread
    @DeleteMapping("/unlike/{threadId}")
    public ResponseEntity<?> unlikeThread(@PathVariable Long threadId, @RequestParam String userId) {
        likeSvc.unlikeThread(userId, threadId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hasLiked/{threadId}")
    public boolean hasLikedThread(@RequestParam String userId, @PathVariable Long threadId) {
        return likeSvc.hasLikedThread(userId, threadId);
    }

    @GetMapping("/{UserId}")
    public List<Long> getLikedThreadByUserId(@PathVariable String UserId) {
        return likeSvc.getLikedThreadsByUserId(UserId);
    }
}

