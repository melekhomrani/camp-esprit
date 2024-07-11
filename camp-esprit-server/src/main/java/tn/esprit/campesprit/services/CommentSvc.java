package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.Comment;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.entities.User;
import tn.esprit.campesprit.repositories.CommentRepo;
import tn.esprit.campesprit.repositories.ForumThreadRepo;
import tn.esprit.campesprit.repositories.UserRepo;

import java.util.List;

@Service
public class CommentSvc {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private ForumThreadRepo forumThreadRepo;

    @Autowired
    private UserRepo userRepo;

    public List<Comment> getCommentsByThreadId(Long threadId) {
        return commentRepo.findByThreadId(threadId);
    }

    public long countCommentsByThreadId(Long threadId) {
        return commentRepo.countByThreadId(threadId);
    }

    public Comment addComment(Long threadId, String userId, String content) {
        ForumThread thread = forumThreadRepo.findById(threadId).orElseThrow(() -> new RuntimeException("Thread not found"));
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setThread(thread);
        comment.setCommentedBy(user);

        return commentRepo.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
    }
}
