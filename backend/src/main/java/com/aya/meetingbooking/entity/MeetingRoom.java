package com.aya.meetingbooking.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "meeting_room")
public class MeetingRoom {
    @Id
    @SequenceGenerator(
            name = "room_seq_gen",
            sequenceName = "room_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "room_seq_gen")
    private Long roomId;
    @Column(name = "room_name")
    private String roomName;
    @Column(name = "room_location")
    private String roomLocation;
    @Column(name = "capacity")
    private int capacity;

    @OneToMany(mappedBy ="meetingRoom", cascade= CascadeType.ALL , orphanRemoval = true)
    private List<Reservation> reservations_list = new ArrayList<>();

    public MeetingRoom() {
    }

    public MeetingRoom(Long roomId, String roomName, String roomLocation, int capacity) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomLocation = roomLocation;
        this.capacity = capacity;
    }

    public MeetingRoom(String roomName, String roomLocation, int capacity) {
        this.roomName = roomName;
        this.roomLocation = roomLocation;
        this.capacity = capacity;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getRoomLocation() {
        return roomLocation;
    }

    public void setRoomLocation(String roomLocation) {
        this.roomLocation = roomLocation;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<Reservation> getReservations_list() {
        return reservations_list;
    }

    public void setReservations_list(List<Reservation> reservations_list) {
        this.reservations_list = reservations_list;
    }

    @Override
    public String toString() {
        return "MeetingRoom{" +
                "roomId=" + roomId +
                ", roomName='" + roomName + '\'' +
                ", roomLocation='" + roomLocation + '\'' +
                ", capacity=" + capacity +
                '}';
    }
}
