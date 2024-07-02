package tn.esprit.campesprit.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private String id;
    private String email;
    private String emailConstraint;
    private Byte emailVerified;
    private Byte enabled;
    private String federationLink;
    private String firstName;
    private String lastName;
    private String realmId;
    private String username;
    private Long createdTimestamp;
    private String serviceAccountClientLink;
    private Integer notBefore;
}