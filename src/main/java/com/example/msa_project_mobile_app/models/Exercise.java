package com.example.msa_project_mobile_app.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Data
@Builder
@Getter
@Setter
@Table(name = "EXERCISE")
public class Exercise {

    @Id
    @Column(name = "euid")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer exercise_unique_id;

    @Enumerated()
    private ExerciseType exerciseId;

    @Column(name = "muscle_group")
    private String muscleGroup;

    @Column(name = "exercise_name")
    private String exerciseName;

    @Column(name = "sets")
    private Integer setsNumber;

    @Column(name = "reps")
    private Integer repsNumber;

    @Column(name = "date")
    private String date;


    public Exercise() {

    }

    public Exercise(Integer exercise_unique_id, ExerciseType exerciseId, String muscleGroup, String exerciseName, Integer setsNumber, Integer repsNumber, String date) {
        this.exercise_unique_id = exercise_unique_id;
        this.exerciseId = exerciseId;
        this.muscleGroup = muscleGroup;
        this.exerciseName = exerciseName;
        this.setsNumber = setsNumber;
        this.repsNumber = repsNumber;
        this.date = date;
    }

    public Exercise(ExerciseType exerciseId, String muscleGroup, String exerciseName, Integer setsNumber, Integer repsNumber, String date) {
        this.exerciseId = exerciseId;
        this.muscleGroup = muscleGroup;
        this.exerciseName = exerciseName;
        this.setsNumber = setsNumber;
        this.repsNumber = repsNumber;
        this.date = date;
    }
}
