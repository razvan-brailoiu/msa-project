package com.example.msa_project_mobile_app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {

    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;
}
