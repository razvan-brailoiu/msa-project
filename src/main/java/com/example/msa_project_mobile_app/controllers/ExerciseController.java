package com.example.msa_project_mobile_app.controllers;

import com.example.msa_project_mobile_app.models.Exercise;
import com.example.msa_project_mobile_app.models.User;
import com.example.msa_project_mobile_app.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {
    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping
    public List<Exercise> getAllExercises(){
        return exerciseRepository.findAll();
    }

    @GetMapping("/")
    public Optional<Exercise> getExerciseById(@RequestParam Integer id){
        return exerciseRepository.findById(id);
    }

    @PostMapping
    public Exercise addExercise(@RequestBody Exercise exercise){
        return exerciseRepository.save(exercise);
    }
}
