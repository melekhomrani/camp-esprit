package tn.esprit.campesprit.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Description")
    private String description;

    @Column(name = "Latitude")
    private float lat;

    @Column(name = "Longitude")
    private float lng;


    @Column(name = "Event_Date")
    private String eventDate;

    @Column(name = "User_ID")
    private String userId;
}
