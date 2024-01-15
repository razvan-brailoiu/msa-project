package com.example.msa_project_mobile_app.service.UserServiceImpl;

import com.example.msa_project_mobile_app.dto.ExerciseDTO;
import com.example.msa_project_mobile_app.models.ExerciseType;
import org.springframework.http.ResponseEntity;

import java.net.http.HttpResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface ExerciseService {
    ResponseEntity<String> registerExercise(ExerciseDTO exerciseDTO, String email);
    ResponseEntity<String> deleteExercise(ExerciseDTO exerciseDTO, String date, String email);
    ResponseEntity<List<ExerciseDTO>> findExercisesForUser(String email, String date);
    ResponseEntity<List<ExerciseDTO>> getAllExercises(String email);
    ResponseEntity<List<Object[]>> getStatistics(String email);
}
