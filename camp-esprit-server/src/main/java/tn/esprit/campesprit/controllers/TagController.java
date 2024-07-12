package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.entities.Tag;
import tn.esprit.campesprit.services.TagSvc;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TagController {
    @Autowired
    private TagSvc tagSvc;
    @GetMapping("/tags")
    public List<Tag> getAllThreads() {
        return tagSvc.getAllTags();
    }

}
