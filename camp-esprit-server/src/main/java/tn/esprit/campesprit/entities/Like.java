package tn.esprit.campesprit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bouncycastle.jcajce.provider.symmetric.GOST28147;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")  // Foreign key to User
    private String userId;

    @ManyToOne
    @JoinColumn(name = "thread_id", referencedColumnName = "id")
    private Thread thread;

}
