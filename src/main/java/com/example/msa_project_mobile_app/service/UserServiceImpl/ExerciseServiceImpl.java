package com.example.msa_project_mobile_app.service.UserServiceImpl;

import com.example.msa_project_mobile_app.dto.ExerciseDTO;
import com.example.msa_project_mobile_app.models.Exercise;
import com.example.msa_project_mobile_app.models.ExerciseTypes;
import com.example.msa_project_mobile_app.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ExerciseServiceImpl implements ExerciseService{

    @Autowired
    public ExerciseRepository exerciseRepository;

    @Override
    public ResponseEntity<String> registerExercise(ExerciseDTO exerciseDTO) {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String formattedDate = today.format(formatter);

        // hardcoding will be changed after JWT implementation
        Exercise exercise = Exercise.builder()
                .exerciseId(ExerciseTypes.getExerciseID(exerciseDTO.getExerciseName()))
                .userId(1)
                .exerciseName(exerciseDTO.getExerciseName())
                .muscleGroup(exerciseDTO.getMuscleGroup())
                .repsNumber(exerciseDTO.getRepsNumber())
                .setsNumber(exerciseDTO.getSetsNumber())
                .date(formattedDate)
                .build();
        exerciseRepository.save(exercise);
        return ResponseEntity.status(201).body("Exercise added succesfully");
    }

    @Override
    public ResponseEntity<String> deleteExercise(String exerciseName,String date, Integer user_id) {
        Integer exerciseId = ExerciseTypes.getExerciseID(exerciseName);
        List<Exercise> exercises = exerciseRepository.findbyexerciseIdanduserIdanddate(date, user_id, exerciseId);
        if (!exercises.isEmpty()){
            exerciseRepository.deleteAll(exercises);
            return ResponseEntity.status(201).body("Exercise was deleted succesfully");
        }else {
            return ResponseEntity.status(404).body("Exercise with given data could not be found");
        }

    }

    @Override
    public ResponseEntity<List<ExerciseDTO>> findExercisesForUser(Integer user_id, String date) {
        List<Exercise> exerciseList =  exerciseRepository.findbydateanduserId(date, user_id);
        if (!exerciseList.isEmpty()){
            List<ExerciseDTO> exerciseDTOS = new ArrayList<>();
            for (Exercise exercise : exerciseList){
                ExerciseDTO dtoExercise = new ExerciseDTO(exercise.getMuscleGroup(), exercise.getExerciseName(), exercise.getSetsNumber(), exercise.getRepsNumber());
                exerciseDTOS.add(dtoExercise);
            }
            return ResponseEntity.status(200).body(exerciseDTOS);
        }
        return ResponseEntity.status(404).body(new ArrayList<>());
    }


}
