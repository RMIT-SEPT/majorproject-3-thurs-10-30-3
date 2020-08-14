package edu.rmit.admin.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.rmit.common.model.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;


@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
public class User {

    @Id
    private String id;

    @Email(message = "Please enter a valid email address")
    @NotBlank
    @Indexed(unique = true)
    private String email;

    @NotBlank
    @Indexed(unique = true)
    @Size(min = 4, max = 25, message = "Username must be between 4 and 25 characters long")
    private String username;

    @NotBlank
    @Size(min = 2, max = 50, message = "Username must be between 2 and 50 characters long")
    private String name;

    @NotBlank
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String address;

    @Indexed(unique = true)
    private String phone;

    private Role role;

    private AuthProvider authProvider;

    private String authProviderId;

    private String imageUrl;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @CreatedDate
    private LocalDateTime createdAt;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    private boolean isVerified = false;

    public User() {
    }
}
