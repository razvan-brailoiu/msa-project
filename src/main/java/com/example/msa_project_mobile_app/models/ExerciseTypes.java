package com.example.msa_project_mobile_app.models;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ExerciseTypes {

    private static Map<String, Integer> exerciseTypes = new HashMap<>();

    static {
        exerciseTypes.put("Push-ups", 1);
        exerciseTypes.put("Pull-ups", 2);
        exerciseTypes.put("Leg Press", 3);
        exerciseTypes.put("Deadlift", 4);
        exerciseTypes.put("Bench press", 5);
        exerciseTypes.put("Legs press", 6);
        exerciseTypes.put("Shoulder press", 7);
        exerciseTypes.put("Seated abs", 8);
    }

    public static Integer getExerciseID(String exerciseType){
        return exerciseTypes.get(exerciseType);
    }

    public static Set<String> getAllExercises(){
        return exerciseTypes.keySet();
    }

}