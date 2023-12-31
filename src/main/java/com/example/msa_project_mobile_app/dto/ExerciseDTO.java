package com.example.msa_project_mobile_app.dto;

import com.example.msa_project_mobile_app.models.ExerciseType;
import lombok.Data;

import java.util.Date;

@Data
public class ExerciseDTO {
    private String muscleGroup;
    private String exerciseName;
    private Integer setsNumber;
    private Integer repsNumber;
    private ExerciseType exerciseType;

    public ExerciseDTO(String muscleGroup, String exerciseName, Integer setsNumber, Integer repsNumber) {
        this.muscleGroup = muscleGroup;
        this.exerciseName = exerciseName;
        this.setsNumber = setsNumber;
        this.repsNumber = repsNumber;
    }
}
