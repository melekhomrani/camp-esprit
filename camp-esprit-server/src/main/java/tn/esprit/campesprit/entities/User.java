package tn.esprit.campesprit.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {
    @Id
    @NotNull
    private String id;

    private String email;

    private String emailConstraint;

    @NotNull
    private Byte emailVerified;

    @NotNull
    private Byte enabled;

    private String federationLink;

    private String firstName;

    private String lastName;

    private String realmId;

    private String username;

    private Long createdTimestamp;

    private String serviceAccountClientLink;

    @NotNull
    private Integer notBefore;

}