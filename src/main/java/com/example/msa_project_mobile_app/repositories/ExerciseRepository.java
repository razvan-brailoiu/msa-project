package com.example.msa_project_mobile_app.repositories;

import com.example.msa_project_mobile_app.models.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
//    List<Exercise> findbydateanduserId(String date, Integer user_id);
//    Exercise findbyexerciseIdanduserIdanddate(Integer exercise_id, Integer user_id, String date);

    @Query("SELECT e FROM Exercise e  WHERE  e.date = :input_date AND e.userId = :input_uid")
    List<Exercise> findbydateanduserId(@Param("input_date") String date, @Param("input_uid") Integer user_id);

    @Query("SELECT e FROM Exercise e  WHERE  e.date = :input_date AND e.userId = :input_uid AND e.exerciseId = :input_eid")
    List<Exercise> findbyexerciseIdanduserIdanddate(@Param("input_date") String date, @Param("input_uid") Integer user_id, @Param("input_eid") Integer exercise_id );
}
