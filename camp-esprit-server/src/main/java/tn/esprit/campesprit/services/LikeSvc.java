package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.entities.Like;
import tn.esprit.campesprit.repositories.LikeRepo;
import tn.esprit.campesprit.repositories.ForumThreadRepo;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeSvc {

    @Autowired
    private LikeRepo likeRepo;

    @Autowired
    private ForumThreadRepo forumThreadRepo;

    public List<Like> getLikesByThreadId(Long threadId) {
        return likeRepo.findByThreadId(threadId);
    }

    public void likeThread(String userId, Long threadId) {
        if (!likeRepo.existsByUserIdAndThreadId(userId, threadId)) {
            Like like = new Like();
            like.setUserId(userId);
            ForumThread thread = forumThreadRepo.findById(threadId).orElseThrow(() -> new IllegalArgumentException("Thread not found"));
            like.setThread(thread);
            likeRepo.save(like);
        }
    }
    public void unlikeThread(String userId, Long threadId) {
        Like like = likeRepo.findByUserIdAndThread_Id(userId, threadId)
                .orElseThrow(() -> new IllegalArgumentException("Like not found"));
        likeRepo.delete(like);
    }
    public int countLikesByThreadId(Long threadId) {
        return likeRepo.findByThreadId(threadId).size();
    }
    public boolean hasLikedThread(String userId, Long threadId) {
        return likeRepo.existsByUserIdAndThreadId(userId, threadId);
    }

    public List<Long> getLikedThreadsByUserId(String userId) {
        List<Like> likes = likeRepo.findByUserId(userId);
        return likes.stream()
                .map(like -> like.getThread().getId())
                .collect(Collectors.toList());
    }
}
