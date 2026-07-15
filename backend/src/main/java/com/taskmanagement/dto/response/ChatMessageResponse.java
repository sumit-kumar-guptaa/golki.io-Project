package com.taskmanagement.dto.response;

import com.taskmanagement.entity.MessageType;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ChatMessageResponse {
    private UUID id;
    private String content;
    private UUID senderId;
    private String senderName;
    private String senderProfileImage;
    private UUID projectId;
    private MessageType type;
    private LocalDateTime createdAt;
}
