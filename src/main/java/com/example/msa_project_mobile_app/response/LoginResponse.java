package com.example.msa_project_mobile_app.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponse {

    private boolean status;
    private String message;

    public LoginResponse(boolean status, String message) {
        this.status = status;
        this.message = message;
    }
}
