package com.example.msa_project_mobile_app.controllers;

import com.example.msa_project_mobile_app.auth.AuthenticationRequest;
import com.example.msa_project_mobile_app.auth.AuthenticationResponse;
import com.example.msa_project_mobile_app.auth.AuthenticationService;
import com.example.msa_project_mobile_app.dto.UserDTO;
import com.example.msa_project_mobile_app.response.LoginResponse;
import com.example.msa_project_mobile_app.service.UserServiceImpl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/secure")
@RequiredArgsConstructor
public class LoginController
{

    @Autowired
    private UserService userService;

    private final AuthenticationService service;

    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse> addUser(@RequestBody UserDTO request)
    {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<AuthenticationResponse> addUser(@RequestBody AuthenticationRequest request)
    {
        return ResponseEntity.ok(service.authenticate(request));
    }


//    @PostMapping(path = "/authenticate")
//    public LoginResponse addUser(@RequestBody UserDTO userDTO)
//    {
//        return userService.createUser(userDTO);
//    }

    @PostMapping (path = "/login")
    public LoginResponse login(@RequestBody Map<String, String> json)
    {
        UserDTO userDTO  =  UserDTO.builder().email(json.get("email")).password(json.get("password")).build();
        return userService.login(userDTO);
    }
}
