package tn.esprit.keycloakstats.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "EVENT_ENTITY")
public class Event implements Serializable {

    @Id
    @Size(max = 36)
    @Column(name = "ID", nullable = false)
    private String id;

    @Size(max = 255)
    @Column(name = "CLIENT_ID")
    private String clientId;

    @Column(name = "DETAILS_JSON", columnDefinition = "text")
    private String detailsJson;

    @Size(max = 255)
    @Column(name = "ERROR")
    private String error;

    @Size(max = 255)
    @Column(name = "IP_ADDRESS")
    private String ipAddress;

    @Size(max = 255)
    @Column(name = "REALM_ID")
    private String realmId;

    @Size(max = 255)
    @Column(name = "SESSION_ID")
    private String sessionId;

    @Column(name = "EVENT_TIME")
    private Long eventTime;

    @Size(max = 255)
    @Column(name = "TYPE")
    private String type;

    @Size(max = 255)
    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "DETAILS_JSON_LONG_VALUE", columnDefinition = "longtext")
    private String detailsJsonLongValue;
}
