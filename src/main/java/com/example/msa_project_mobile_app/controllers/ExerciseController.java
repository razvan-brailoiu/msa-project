package com.example.msa_project_mobile_app.controllers;

import com.example.msa_project_mobile_app.dto.ExerciseDTO;
import com.example.msa_project_mobile_app.service.UserServiceImpl.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @PostMapping("/exercise")
    public ResponseEntity<String> postExercise(@RequestBody ExerciseDTO exerciseDTO){
        return exerciseService.registerExercise(exerciseDTO);
    }

    @DeleteMapping("/exercise")
    public ResponseEntity<String> deleteExercise(@RequestParam String exerciseName, @RequestParam String date, @RequestParam Integer user_id){
        return exerciseService.deleteExercise(exerciseName, date, user_id);
    }

    @GetMapping("/exercise")
    public ResponseEntity<List<ExerciseDTO>> getExercisesForUser(@RequestParam Integer user_id){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String formattedDate = today.format(formatter);
        return exerciseService.findExercisesForUser(user_id, formattedDate);
    }

//    @GetMapping
//    public List<Exercise> getAllExercises(){
//        return exerciseRepository.findAll();
//    }
//
//    @GetMapping("/")
//    public Optional<Exercise> getExerciseById(@RequestParam Integer id){
//        return exerciseRepository.findById(id);
//    }
//
//    @PostMapping
//    public Exercise addExercise(@RequestBody Exercise exercise){
//        return exerciseRepository.save(exercise);
//    }
//

}
