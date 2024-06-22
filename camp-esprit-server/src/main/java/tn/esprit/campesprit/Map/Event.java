package tn.esprit.campesprit.Map;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import tn.esprit.campesprit.User.User;

@Entity
@Data
@Table(name = "events")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="ID")
	private Long id;
	
	@Column(name="Description")
	private String description;
	
	@Column(name="Latitude")
	private float lat;
	
	@Column(name="Longitude")
	private float lng;
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name="Event_Date")
	private String event_date;
	
	@OneToOne
	private User user;
	

}
