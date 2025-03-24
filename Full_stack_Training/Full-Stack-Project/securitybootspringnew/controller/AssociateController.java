package com.spring.bootsecuirty.secuirtybootspringnew.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bootsecuirty.secuirtybootspringnew.model.Task;
import com.spring.bootsecuirty.secuirtybootspringnew.service.TaskService;
import com.spring.bootsecuirty.secuirtybootspringnew.service.UserService;

@RestController
@RequestMapping("/associate")
public class AssociateController {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping("/check")
	public String checker()
	{
		return "Welcome associate home page";
	}
	
	@GetMapping("/tasks/assignedTo")
	@PreAuthorize("hasRole('ASSOCIATE')")
	public List<Task> getTasksAssignedToMe(){
		return taskService.getTasksAssignedToMe();
	}
	
	
	 @PutMapping("/tasks/{id}")
	    @PreAuthorize("hasRole('ASSOCIATE')")
	    public ResponseEntity<Task> updateTaskStatus(@PathVariable Integer id, @RequestBody String status) {

	        String cleanedStatus = status.trim().replaceAll("[\"{}\\s]", "");
	        Task updatedTask = taskService.updateTaskStatus(id, cleanedStatus);

	        if (updatedTask != null) {
	            return ResponseEntity.ok(updatedTask);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    // Add Comment to Task (for associates)
	    @PatchMapping("/tasks/{id}/comment")
	    @PreAuthorize("hasRole('ASSOCIATE')")
	    public ResponseEntity<?> updateTaskComment(
	            @PathVariable Integer id,
	            @RequestBody Map<String, Object> payload) {
	        try {
	            String comment = (String) payload.get("comment");
	            String emailId = (String) payload.get("emailId");

	            // Log the email to verify the value
	            System.out.println("Received emailId: " + emailId);

	            if (emailId == null || emailId.isEmpty()) {
	                return ResponseEntity.badRequest().body("Email ID is required.");
	            }

	            taskService.updateTaskComment(id, comment, emailId);
	            return ResponseEntity.ok("Comment updated successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
	        }
	    }
	
//	@PostMapping("/comment/{id}")
//	@PreAuthorize("hasRole('ASSOCIATE')")
//    public ResponseEntity<String> addComment(@PathVariable Integer id, @RequestBody String comment) {
//        taskService.addCommentToTask(id, comment);
//        return ResponseEntity.ok("Comment added");
//    }
	
	@DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }
	
}
