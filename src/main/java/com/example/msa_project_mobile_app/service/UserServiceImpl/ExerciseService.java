package com.example.msa_project_mobile_app.service.UserServiceImpl;

import com.example.msa_project_mobile_app.dto.ExerciseDTO;
import org.springframework.http.ResponseEntity;

import java.net.http.HttpResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface ExerciseService {
    ResponseEntity<String> registerExercise(ExerciseDTO exerciseDTO);
    ResponseEntity<String> deleteExercise(String exerciseName,String date, Integer user_id);
    ResponseEntity<List<ExerciseDTO>> findExercisesForUser(Integer user_id, String date);
}
