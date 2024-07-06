package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.Comment;
import tn.esprit.campesprit.services.CommentSvc;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentSvc commentSvc;

    @GetMapping("/thread/{threadId}")
    public List<Comment> getCommentsByThreadId(@PathVariable Long threadId) {
        return commentSvc.getCommentsByThreadId(threadId);
    }

    @GetMapping("/count/{threadId}")
    public long countCommentsByThreadId(@PathVariable Long threadId) {
        return commentSvc.countCommentsByThreadId(threadId);
    }

    @PostMapping("/thread/{threadId}")
    public Comment addComment(@PathVariable Long threadId, @RequestParam String userId, @RequestParam String content) {
        return commentSvc.addComment(threadId, userId, content);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentSvc.deleteComment(commentId);
    }
}
