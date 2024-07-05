package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.entities.Tag;
import tn.esprit.campesprit.entities.User;
import tn.esprit.campesprit.repositories.ForumThreadRepo;
import tn.esprit.campesprit.repositories.TagRepo;
import tn.esprit.campesprit.repositories.UserRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ForumThreadSvc {
    @Autowired
    private ForumThreadRepo forumthreadRepo;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TagRepo tagRepo;
    // Method to get all threads
    public List<ForumThread> getAllThreads() {
        return forumthreadRepo.findAll();
    }
    public ForumThread createThread(ForumThread forumThread, String userId, List<Long> tagIds) {
        // Check if the user exists and set it in the forumThread
        Optional<User> userOpt = userRepo.findById(userId);
        if (!userOpt.isPresent()) {
            throw new IllegalArgumentException("User does not exist");
        }
        forumThread.setCreatedBy(userOpt.get());

        // Check if all tags exist and set them in the forumThread
        List<Tag> tags = tagRepo.findAllById(tagIds);
        if (tags.size() != tagIds.size()) {
            throw new IllegalArgumentException("One or more tags do not exist");
        }
        forumThread.setTags(tags);

        // Save the forum thread
        return forumthreadRepo.save(forumThread);
    }
}
