package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.Tag;
import tn.esprit.campesprit.repositories.TagRepo;

import java.util.List;

@Service
public class TagSvc {
    @Autowired
    private TagRepo tagRepo;

    public List<Tag> getAllTags() {return tagRepo.findAll(); }
}
