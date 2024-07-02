package tn.esprit.keycloakstats.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CREDENTIAL")
public class Cred {
    @Id
    @Size(max = 36)
    @Column(name = "ID", nullable = false)
    private String id;

    @Column(name = "SALT")
    private byte[] salt;

    @Size(max = 255)
    @Column(name = "TYPE")
    private String type;

    @Size(max = 36)
    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "CREATED_DATE")
    private Long createdDate;

    @Size(max = 255)
    @Column(name = "USER_LABEL")
    private String userLabel;

    @Column(name = "SECRET_DATA", columnDefinition = "longtext")
    private String secretData;

    @Column(name = "CREDENTIAL_DATA", columnDefinition = "longtext")
    private String credentialData;

    @Column(name = "PRIORITY")
    private Integer priority;

}
