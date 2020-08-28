package edu.rmit.app.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Document(collection = "services")
@Getter
@Setter
public class Tag {

    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    @Indexed
    @NotBlank
    private String name;

    @DBRef(lazy = true)
    private Business business;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @CreatedDate
    private LocalDateTime createdAt;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
