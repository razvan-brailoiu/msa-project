package com.example.msa_project_mobile_app.repositories;

import com.example.msa_project_mobile_app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
