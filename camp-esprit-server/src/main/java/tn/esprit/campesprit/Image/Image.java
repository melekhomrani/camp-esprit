package tn.esprit.campesprit.Image;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "images")
@NoArgsConstructor
public class Image {

    @Id
    
    private Long id;

    private String imageName;
    @Lob
    @Column(name = "image_data", columnDefinition = "MEDIUMBLOB")
    private byte[] imageData;
    private String description;
    

   

}