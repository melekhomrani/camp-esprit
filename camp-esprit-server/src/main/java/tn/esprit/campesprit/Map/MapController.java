package tn.esprit.campesprit.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.campesprit.User.User;
import tn.esprit.campesprit.User.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class MapController {
    @Autowired
    private EventServices eventServices;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private EventRepository eventRepo;
    
    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody EventRequest request) {
    	User user = userRepo.findUserById(request.getUserId());
    	Event event= new Event();
    	event.setDescription(request.getDescription());
    	event.setLat(request.getLat());
    	event.setLng(request.getLng());
    	event.setEvent_date(request.getEvent_date());
    	event.setUser(user);
        Event addedEvent = eventServices.addEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedEvent);
    }

    @PutMapping("/update")
    public void updateEvent(@RequestBody EventRequest eventRequest) {
        eventServices.updateEvent(eventRequest);
    }

    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        Optional<Event> existingEvent = eventServices.getEventById(eventId);
        if (existingEvent.isPresent()) {
            eventServices.deleteEventById(eventId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/{eventId}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long eventId) {
        Event event = eventServices.getEventExistById(eventId);
        
        	EventResponse eventResponse = new EventResponse();
        	eventResponse.setId(event.getId());
        	eventResponse.setDescription(event.getDescription());
        	eventResponse.setLat(event.getLat());
        	eventResponse.setLng(event.getLng());
        	eventResponse.setEvent_date(event.getEvent_date());
        	eventResponse.setUserId(event.getUser().getId());
        	eventResponse.setFirstName(event.getUser().getFirstname());
        	eventResponse.setLastName(event.getUser().getLastname());
        	
        	
            return ResponseEntity.ok(eventResponse);
        }
    
    
    @GetMapping
    public ResponseEntity<List<EventResponse>> getAll(){
    	return ResponseEntity.ok().body(eventServices.getAllEvents());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable String userId) {
        Optional<List<Event>> userEvents = eventServices.getEventsByUserId(userId);
        if (userEvents.isPresent()) {
            return ResponseEntity.ok(userEvents.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}

