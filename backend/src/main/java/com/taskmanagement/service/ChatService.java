package com.taskmanagement.service;

import com.taskmanagement.dto.response.ChatMessageResponse;
import com.taskmanagement.entity.*;
import com.taskmanagement.repository.ChatMessageRepository;
import com.taskmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    // Track online users per project: projectId -> Set of user emails
    private final Map<UUID, Set<String>> onlineUsers = new ConcurrentHashMap<>();

    public ChatMessageResponse saveMessage(String content, MessageType type, UUID projectId, String senderEmail) {
        User sender = userRepository.findByEmail(senderEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        ChatMessage message = ChatMessage.builder()
            .content(content)
            .type(type)
            .projectId(projectId)
            .sender(sender)
            .build();

        ChatMessage saved = chatMessageRepository.save(message);
        return toResponse(saved, sender);
    }

    public List<ChatMessageResponse> getHistory(UUID projectId, int page, int size) {
        Page<ChatMessage> messages = chatMessageRepository.findByProjectIdWithSender(
            projectId, PageRequest.of(page, size)
        );
        List<ChatMessageResponse> list = new ArrayList<>(messages.getContent().stream()
            .map(m -> toResponse(m, m.getSender()))
            .toList());
        Collections.reverse(list); // reverse so oldest first
        return list;
    }

    public void addOnlineUser(UUID projectId, String email) {
        onlineUsers.computeIfAbsent(projectId, k -> ConcurrentHashMap.newKeySet()).add(email);
    }

    public void removeOnlineUser(UUID projectId, String email) {
        Set<String> users = onlineUsers.get(projectId);
        if (users != null) {
            users.remove(email);
            if (users.isEmpty()) onlineUsers.remove(projectId);
        }
    }

    public Set<String> getOnlineUsers(UUID projectId) {
        return onlineUsers.getOrDefault(projectId, Collections.emptySet());
    }

    private ChatMessageResponse toResponse(ChatMessage msg, User sender) {
        return ChatMessageResponse.builder()
            .id(msg.getId())
            .content(msg.getContent())
            .senderId(sender.getId())
            .senderName(sender.getName())
            .senderProfileImage(sender.getProfileImage())
            .projectId(msg.getProjectId())
            .type(msg.getType())
            .createdAt(msg.getCreatedAt())
            .build();
    }
}
