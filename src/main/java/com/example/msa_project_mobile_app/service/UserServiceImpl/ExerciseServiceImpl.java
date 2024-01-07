package com.example.msa_project_mobile_app.service.UserServiceImpl;

import com.example.msa_project_mobile_app.dto.ExerciseDTO;
import com.example.msa_project_mobile_app.models.Exercise;
import com.example.msa_project_mobile_app.models.ExerciseType;
import com.example.msa_project_mobile_app.models.User;
import com.example.msa_project_mobile_app.repositories.ExerciseRepository;
import com.example.msa_project_mobile_app.repositories.UserRepository;
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

    @Autowired
     UserRepository userRepository;

    @Override
    public ResponseEntity<String> registerExercise(ExerciseDTO exerciseDTO, String email) {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String formattedDate = today.format(formatter);

        // hardcoding will be changed after JWT implementation
        Exercise exercise = Exercise.builder()
                .exerciseId(exerciseDTO.getExerciseType())
                .exerciseName(exerciseDTO.getExerciseName())
                .muscleGroup(exerciseDTO.getMuscleGroup())
                .repsNumber(exerciseDTO.getRepsNumber())
                .setsNumber(exerciseDTO.getSetsNumber())
                .date(formattedDate)
                .build();
        User user = userRepository.findByEmail(email);
        user.getExercises().add(exercise);
        userRepository.save(user);
        return ResponseEntity.status(201).body("Exercise added succesfully");
    }

    @Override
    public ResponseEntity<String> deleteExercise(ExerciseType exerciseName,String date, String email) {
        User user = userRepository.findByEmail(email);
        List<Exercise> exercises = user.getExercises();
        int ok = 0;
        for(int i = 0; i < exercises.size(); i++)
        {
            if(exercises.get(i).getExerciseId().equals(exerciseName) && exercises.get(i).getDate().equals(date))
            {
                exercises.remove(exercises.get(i));
                ok = 1;
            }
        }
        if (ok == 1){
            user.setExercises(exercises);
            userRepository.save(user);
            return ResponseEntity.status(201).body("Exercise was deleted succesfully");
        }else {
            return ResponseEntity.status(404).body("Exercise with given data could not be found");
        }

    }

    @Override
    public ResponseEntity<List<ExerciseDTO>> findExercisesForUser(String email, String date) {
        List<Exercise> exerciseList =  userRepository.findByEmail(email).getExercises();
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

    @Override
    public ResponseEntity<List<ExerciseDTO>> getAllExercises(String email)
    {
        List<Exercise> exerciseList =  userRepository.findByEmail(email).getExercises();
        List<ExerciseDTO> exerciseDTOS = new ArrayList<>();
        if (!exerciseList.isEmpty()){
            return ResponseEntity.status(404).body(new ArrayList<>());
        }
        for (Exercise exercise : exerciseList){
            ExerciseDTO dtoExercise = new ExerciseDTO(exercise.getMuscleGroup(), exercise.getExerciseName(), exercise.getSetsNumber(), exercise.getRepsNumber());
            exerciseDTOS.add(dtoExercise);
        }
        return ResponseEntity.ok(exerciseDTOS);
    }

    @Override
    public ResponseEntity<List<Object[]>> getStatistics(){
        List<Object[]> exerciseList = exerciseRepository.countByMuscleGroup();
        return ResponseEntity.status(200).body(exerciseList);
    }


}
