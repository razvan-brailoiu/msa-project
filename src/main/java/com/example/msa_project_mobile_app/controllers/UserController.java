package com.example.msa_project_mobile_app.controllers;

import com.example.msa_project_mobile_app.models.User;
import com.example.msa_project_mobile_app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/")
    public Optional<User> getUserById(@RequestParam Integer id){
        return userRepository.findById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }
}
