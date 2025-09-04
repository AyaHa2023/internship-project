package com.aya.meetingbooking.dto;

public class MeetingRoomDto {
    private Long id;
    private String roomName;
    private String roomLocation;
    private int capacity;

    public MeetingRoomDto() {}

    public MeetingRoomDto(Long id, String roomName, String roomLocation, int capacity) {
        this.id = id;
        this.roomName = roomName;
        this.roomLocation = roomLocation;
        this.capacity = capacity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }
    public String getRoomLocation() { return roomLocation; }
    public void setRoomLocation(String roomLocation) { this.roomLocation = roomLocation; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
}
