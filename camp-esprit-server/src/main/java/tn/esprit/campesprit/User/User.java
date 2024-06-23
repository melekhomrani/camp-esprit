package tn.esprit.campesprit.User;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.esprit.campesprit.Map.Event;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String firstname;

	private String lastname;

	private String email;

	private String password;
//	@Temporal(TemporalType.TIME.DATE)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private String birthday;
	
	@Column(name="bio")
	private String bio;

	@OneToMany
	@JoinTable(name = "user_events", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
	private List<Event> events;

}
