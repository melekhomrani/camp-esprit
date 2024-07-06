package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.Comment;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.repositories.CommentRepo;
import tn.esprit.campesprit.repositories.ForumThreadRepo;

import java.util.List;

@Service
public class CommentSvc {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private ForumThreadRepo forumThreadRepo;

    public List<Comment> getCommentsByThreadId(Long threadId) {
        return commentRepo.findByThreadId(threadId);
    }

    public long countCommentsByThreadId(Long threadId) {
        return commentRepo.countByThreadId(threadId);
    }

    public Comment addComment(Long threadId, String userId, String content) {
        ForumThread thread = forumThreadRepo.findById(threadId).orElseThrow(() -> new IllegalArgumentException("Thread not found"));
        Comment comment = new Comment();
        comment.setThread(thread);
        comment.setUserId(userId);
        comment.setContent(content);
        return commentRepo.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
    }
}
