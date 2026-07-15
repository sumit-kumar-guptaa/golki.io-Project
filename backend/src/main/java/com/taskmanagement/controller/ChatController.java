package com.taskmanagement.controller;

import com.taskmanagement.dto.response.ApiResponse;
import com.taskmanagement.dto.response.ChatMessageResponse;
import com.taskmanagement.entity.MessageType;
import com.taskmanagement.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.*;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    // === WebSocket STOMP Endpoints ===

    @MessageMapping("/chat.send/{projectId}")
    public void sendMessage(@DestinationVariable UUID projectId,
                            @Payload Map<String, String> payload,
                            Principal principal) {
        String content = payload.get("content");
        if (content == null || content.isBlank()) return;

        ChatMessageResponse response = chatService.saveMessage(
            content, MessageType.CHAT, projectId, principal.getName()
        );
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, response);
    }

    @MessageMapping("/chat.join/{projectId}")
    public void joinChat(@DestinationVariable UUID projectId, Principal principal) {
        String email = principal.getName();
        chatService.addOnlineUser(projectId, email);

        ChatMessageResponse response = chatService.saveMessage(
            email + " joined the chat", MessageType.JOIN, projectId, email
        );
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, response);

        // Send updated online users list
        messagingTemplate.convertAndSend("/topic/chat/" + projectId + "/online",
            chatService.getOnlineUsers(projectId));
    }

    @MessageMapping("/chat.leave/{projectId}")
    public void leaveChat(@DestinationVariable UUID projectId, Principal principal) {
        String email = principal.getName();
        chatService.removeOnlineUser(projectId, email);

        ChatMessageResponse response = chatService.saveMessage(
            email + " left the chat", MessageType.LEAVE, projectId, email
        );
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, response);
        messagingTemplate.convertAndSend("/topic/chat/" + projectId + "/online",
            chatService.getOnlineUsers(projectId));
    }

    @MessageMapping("/chat.typing/{projectId}")
    public void typing(@DestinationVariable UUID projectId, Principal principal) {
        Map<String, String> payload = Map.of("email", principal.getName());
        messagingTemplate.convertAndSend("/topic/chat/" + projectId + "/typing", payload);
    }

    // === REST Endpoints ===

    @GetMapping("/api/chat/{projectId}/history")
    public ApiResponse<List<ChatMessageResponse>> getHistory(
            @PathVariable UUID projectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ApiResponse.success(chatService.getHistory(projectId, page, size));
    }
}
