package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.Campground;
import tn.esprit.campesprit.repositories.CampgroundRepository;

import java.util.List;

@RestController
@RequestMapping("/api/campgrounds")
public class CampgroundController {

    @Autowired
    private CampgroundRepository campgroundRepository;

    @GetMapping
    public ResponseEntity<List<Campground>> getAllCampgrounds() {
        List<Campground> campgrounds = campgroundRepository.findAll();
        return new ResponseEntity<>(campgrounds, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campground> getCampgroundById(@PathVariable("id") Long id) {
        Campground campground = campgroundRepository.findById(id)
                .orElse(null); // Handle not found case as needed
        if (campground != null) {
            return new ResponseEntity<>(campground, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Campground> createCampground(@RequestBody Campground campground) {
        try {
            Campground createdCampground = campgroundRepository.save(campground);
            return new ResponseEntity<>(createdCampground, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Campground> updateCampground(@PathVariable("id") Long id, @RequestBody Campground campground) {
//        Campground existingCampground = campgroundRepository.findById(id)
//                .orElse(null); // Handle not found case as needed
//        if (existingCampground != null) {
//            existingCampground.setName(campground.getName());
//            existingCampground.setDescription(campground.getDescription());
//            existingCampground.setImageUrl(campground.getImageUrl());
//            existingCampground.setPrice(campground.getPrice());
//            existingCampground.setRating(campground.getRating());
//            existingCampground.setAmenity(campground.getAmenity().getId());
//
//            Campground updatedCampground = campgroundRepository.save(existingCampground);
//            return new ResponseEntity<>(updatedCampground, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCampground(@PathVariable("id") Long id) {
        try {
            campgroundRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}