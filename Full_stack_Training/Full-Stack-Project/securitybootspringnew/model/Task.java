package com.spring.bootsecuirty.secuirtybootspringnew.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String description;

//  @Enumerated(EnumType.STRING)
//  private TaskStatus status;
	@Column(nullable = false)
	private String status;

	@ManyToOne
	@JoinColumn(name = "assigned_to_user_id")
	private User assignedTo;

	// Reference to User entity for tasks assigned by

	@ManyToOne
	@JoinColumn(name = "assigned_by_user_id")
	private User assignedBy;
	
	@Column(nullable=false)
	private String comment;
	
//	@ElementCollection
//    @CollectionTable(name = "task_comments", joinColumns = @JoinColumn(name = "id"))
//    private List<comments> comments = new ArrayList<>();
	
	
//	public List<comments> getComments() {
//		return comments;
//	}
//
//	public void setComments(List<comments> comments) {
//		this.comments = comments;
//	}
	

	private LocalDate dueDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}

	public User getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(User assignedBy) {
		this.assignedBy = assignedBy;
	}
	
	

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	@Override
	public String toString() {
		return "Task{id=" + id + ", description='" + description + "', status='" + status + "', assignedTo="
				+ assignedTo + ", assignedBy=" + assignedBy + ", comment='" + comment +", dueDate='" + dueDate + "}";
	}

}
