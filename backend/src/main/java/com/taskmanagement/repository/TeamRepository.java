package com.taskmanagement.repository;

import com.taskmanagement.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;

public interface TeamRepository extends JpaRepository<Team, UUID> {
    @Query("SELECT DISTINCT t FROM Team t " +
        "LEFT JOIN FETCH t.members m " +
        "LEFT JOIN FETCH t.createdBy cb " +
        "WHERE m.id = :userId")
    List<Team> findTeamsByUserId(UUID userId);
    
    @Query("SELECT DISTINCT t FROM Team t " +
        "LEFT JOIN FETCH t.members m " +
        "LEFT JOIN FETCH t.createdBy cb " +
        "WHERE cb.id = :userId")
    List<Team> findTeamsCreatedBy(UUID userId);

    @Query("SELECT DISTINCT t FROM Team t " +
        "LEFT JOIN FETCH t.members m " +
        "LEFT JOIN FETCH t.createdBy cb")
    List<Team> findAllWithMembersAndCreator();

        @Query("SELECT t FROM Team t " +
            "LEFT JOIN FETCH t.members m " +
            "LEFT JOIN FETCH t.createdBy cb " +
            "WHERE t.id = :id")
        Optional<Team> findByIdWithMembersAndCreator(UUID id);
}
