package tn.esprit.campesprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.campesprit.entities.Event;
import tn.esprit.campesprit.repositories.EventRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EventServices {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setDescription(eventDetails.getDescription());
        event.setLat(eventDetails.getLat());
        event.setLng(eventDetails.getLng());
        event.setEventDate(eventDetails.getEventDate());
        event.setUserId(eventDetails.getUserId());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }


//    public List<Event> filterEvents(String description, String eventDate) {
//        if (description != null && eventDate != null) {
//            return eventRepository.findByDescriptionAndEvent_date(description, eventDate);
//        } else if (eventDate != null) {
//            return eventRepository.findByEventDate(eventDate);
//        } else {
//            return eventRepository.findAll();
//        }
//    }


}
