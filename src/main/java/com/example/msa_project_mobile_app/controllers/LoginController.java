package com.example.msa_project_mobile_app.controllers;

import com.example.msa_project_mobile_app.dto.UserDTO;
import com.example.msa_project_mobile_app.response.LoginResponse;
import com.example.msa_project_mobile_app.service.UserServiceImpl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping()
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/addUser")
    public LoginResponse addUser(@RequestBody UserDTO userDTO)
    {
        return userService.createUser(userDTO);
    }

    @GetMapping (path = "/login")
    public LoginResponse login(@RequestBody UserDTO userDTO)
    {
        return userService.login(userDTO);
    }
}
