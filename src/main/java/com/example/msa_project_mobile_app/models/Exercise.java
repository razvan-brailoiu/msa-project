package com.example.msa_project_mobile_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "EXERCISE")
public class Exercise {
    @Id
    @Column(name = "exercise_id")
    private Integer id;

    @Column(name = "muscle_group")
    private String muscleGroup;

    @Column(name = "exercise_name")
    private String exerciseName;

    @Column(name = "sets")
    private Integer setsNumber;

    @Column(name = "reps")
    private Integer repsNumber;
}
