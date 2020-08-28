package edu.rmit.app.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "businesses")
@Getter
@Setter
@AllArgsConstructor
public class Business {

    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    private String name;

    private String address;

    private String description;

    @DBRef
    private List<User> workers = new ArrayList<>();

    @DBRef
    private List<Tag> tags = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @CreatedDate
    private LocalDateTime createdAt;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Business() {
    }
}
