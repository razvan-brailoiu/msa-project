package com.example.msa_project_mobile_app.repositories;

import com.example.msa_project_mobile_app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String username, String password);
    User findByEmail(String email);
}
