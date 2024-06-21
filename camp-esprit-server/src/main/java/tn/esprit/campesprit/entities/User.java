package tn.esprit.campesprit.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.ReadOnlyProperty;

@Getter
@Setter
@Entity
@Table(name = "USER_ENTITY")
public class User {
    @Id
    @Size(max = 36)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Size(max = 255)
    @Column(name = "EMAIL")
    private String email;

    @Size(max = 255)
    @Column(name = "EMAIL_CONSTRAINT")
    private String emailConstraint;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "EMAIL_VERIFIED", nullable = false)
    private Byte emailVerified;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "ENABLED", nullable = false)
    private Byte enabled;

    @Size(max = 255)
    @Column(name = "FEDERATION_LINK")
    private String federationLink;

    @Size(max = 255)
    @Column(name = "FIRST_NAME")
    private String firstName;

    @Size(max = 255)
    @Column(name = "LAST_NAME")
    private String lastName;

    @Size(max = 255)
    @Column(name = "REALM_ID")
    private String realmId;

    @Size(max = 255)
    @Column(name = "USERNAME")
    private String username;

    @Column(name = "CREATED_TIMESTAMP")
    private Long createdTimestamp;

    @Size(max = 255)
    @Column(name = "SERVICE_ACCOUNT_CLIENT_LINK")
    private String serviceAccountClientLink;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "NOT_BEFORE", nullable = false)
    private Integer notBefore;

}