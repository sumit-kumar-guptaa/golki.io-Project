package com.taskmanagement.repository;

import com.taskmanagement.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    @Query("SELECT m FROM ChatMessage m JOIN FETCH m.sender WHERE m.projectId = :projectId ORDER BY m.createdAt DESC")
    Page<ChatMessage> findByProjectIdWithSender(UUID projectId, Pageable pageable);
}
