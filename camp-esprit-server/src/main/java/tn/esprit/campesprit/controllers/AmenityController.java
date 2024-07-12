package tn.esprit.campesprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.entities.Amenity;
import tn.esprit.campesprit.repositories.AmenityRepository;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
public class AmenityController {

    @Autowired
    private AmenityRepository amenityRepository;

    @GetMapping
    public ResponseEntity<List<Amenity>> getAllAmenities() {
        List<Amenity> amenities = amenityRepository.findAll();
        return new ResponseEntity<>(amenities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Amenity> getAmenityById(@PathVariable("id") Long id) {
        Amenity amenity = amenityRepository.findById(id)
                .orElse(null);
        if (amenity != null) {
            return new ResponseEntity<>(amenity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Amenity> createAmenity(@RequestBody Amenity amenity) {
        try {
            Amenity createdAmenity = amenityRepository.save(amenity);
            return new ResponseEntity<>(createdAmenity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Amenity> updateAmenity(@PathVariable("id") Long id, @RequestBody Amenity amenity) {
//        Amenity existingAmenity = amenityRepository.findById(id)
//                .orElse(null); // Handle not found case as needed
//        if (existingAmenity != null) {
//            existingAmenity.setName(amenity.getName());
//            existingAmenity.setDescription(amenity.getDescription());
//            existingAmenity.setCategory(amenity.getCategory());
//
//            Amenity updatedAmenity = amenityRepository.save(existingAmenity);
//            return new ResponseEntity<>(updatedAmenity, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAmenity(@PathVariable("id") Long id) {
        try {
            amenityRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}