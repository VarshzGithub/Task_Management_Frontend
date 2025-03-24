package com.spring.bootsecuirty.secuirtybootspringnew.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bootsecuirty.secuirtybootspringnew.model.Task;
import com.spring.bootsecuirty.secuirtybootspringnew.model.TaskStatus;
import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
import com.spring.bootsecuirty.secuirtybootspringnew.service.TaskService;
import com.spring.bootsecuirty.secuirtybootspringnew.service.UserService;

@RestController
@RequestMapping("/lead")
public class LeadController {
	
	 @Autowired
	 private TaskService taskService;
	 
	 @Autowired
	 private UserService userService;
	 
	 
	@GetMapping("/check")
	public String checker()
	{
		return "Welcome lead home page";
	}
	@GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }
	
	@PutMapping("/users/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
    
    
    @GetMapping("/tasks/assignedTo")
    public List<Task> getTasksAssignedToLead() {
        List<Task> tasks = taskService.getTasksAssignedToMe();
        System.out.println("Tasks assigned to lead: " + tasks);
        return tasks;
    }

    // Get all tasks assigned by the current user (Lead)
    @GetMapping("/tasks/assignedBy")
    public List<Task> getTasksAssignedByLead() {
        List<Task> tasks = taskService.getTasksAssignedByLead();
        System.out.println("Tasks assigned by lead: " + tasks);
        return tasks;
    }
//    // Get all tasks assigned to the current lead
//    @GetMapping("/tasks/assignedTo")
//    public List<Task> getTasksAssignedToLead() {
//        //return taskService.getTasksAssignedToLead();
//    	 List<Task> tasks = taskService.getTasksAssignedToLead();
//    	 System.out.println("Tasks assigned to lead: " + tasks);
//    	 return tasks;
//    }
//
//    // Get all tasks assigned by the current lead
//    @GetMapping("/tasks/assignedBy")
//    public List<Task> getTasksAssignedByLead() {
//        return taskService.getTasksAssignedByLead();
//    }
    
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return taskService.getTaskById(id);
    }
    
//    @PostMapping("/tasks")
//    @PreAuthorize("hasRole('LEAD')")
//    public String createTask(@RequestBody Task task) {
//    	taskService.createTask(task);
//        return "Success";
//    }
    
    @PostMapping("/tasks")
    // @PreAuthorize("hasRole('MANAGER')")
     public ResponseEntity<Map<String, String>> createTask(@RequestBody Task task) {
     	taskService.createTask(task);
        // return "Success";
     	  return ResponseEntity.ok(Map.of("message", "Success"));
     }

    @PutMapping("/tasks/{id}")
    @PreAuthorize("hasRole('LEAD')")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Integer id, @RequestBody String status) {

    	String cleanedStatus = status.trim().replaceAll("[\"{}\\s]", "");
        Task updatedTask = taskService.updateTaskStatus(id, cleanedStatus);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @PutMapping("/update-due-date/{id}")
    public ResponseEntity<String> updateTaskDueDate(@PathVariable Integer id, @RequestBody Map<String, String> requestBody) {
        try {
            // Parse the due date from the request body
            String dueDateString = requestBody.get("dueDate");
            LocalDate parsedDueDate = LocalDate.parse(dueDateString);

            // Get the logged-in user's username
            String loggedInUsername = SecurityContextHolder.getContext().getAuthentication().getName();

            // Call the service to update the due date, passing the logged-in user's username
            taskService.updateTaskDueDate(id, parsedDueDate, loggedInUsername);  // Fixed this method call

            return ResponseEntity.ok("Due date updated successfully for Task ID: " + id);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Please use yyyy-MM-dd.");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this task.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating due date: " + e.getMessage());
        }
    }
    
    

    
//    @PatchMapping("/tasks/{id}/comment")
//    public ResponseEntity<?> updateTaskComment(
//            @PathVariable Integer id,
//            @RequestBody Map<String, Object> payload) {
//        try {
//            String comment = (String) payload.get("comment");
//            String emailId = (String) payload.get("emailId"); // Using emailId instead of userId
//            taskService.updateTaskComment(id, comment, emailId);
//            return ResponseEntity.ok("Comment updated successfully.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
//        }
//    }
    @PatchMapping("/tasks/{id}/comment")
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




//    @PutMapping("/update-due-date/{id}")
//    public ResponseEntity<String> updateTaskDueDate(@PathVariable Integer id, @RequestParam String dueDate) {
//        try {
//            LocalDate parsedDueDate = LocalDate.parse(dueDate);
//            taskService.updateTaskDueDate(id, parsedDueDate);
//            return ResponseEntity.ok("Due date updated successfully for Task ID: " + id);
//        } catch (DateTimeParseException e) {
//            return ResponseEntity.badRequest().body("Invalid date format. Please use yyyy-MM-dd.");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error updating due date: " + e.getMessage());
//        }
//    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }
	
}
