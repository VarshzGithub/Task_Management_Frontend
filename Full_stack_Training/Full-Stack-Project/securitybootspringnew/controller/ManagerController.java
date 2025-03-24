package com.spring.bootsecuirty.secuirtybootspringnew.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
import com.spring.bootsecuirty.secuirtybootspringnew.service.TaskService;
import com.spring.bootsecuirty.secuirtybootspringnew.service.UserService;

@RestController
@RequestMapping("/manager")
public class ManagerController {
	
	 @Autowired
	 private TaskService taskService;
	 
	 @Autowired
	 private UserService userService;
	 
	 
	@GetMapping("/check")
	public String checker()
	{
		return "Welcome manager home page";
	}
	
	@GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Authorization")
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
//    @PutMapping("/users/{id}")
//    @PreAuthorize("hasRole('MANAGER')") 
//    public User updateUser(@PathVariable Integer id, @RequestBody User user) {
//        return userService.updateUser(id, user);
//    }
    
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
    
    
    // Task endpoints

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return taskService.getTaskById(id);
    }
    
    @PostMapping("/tasks")
   // @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Map<String, String>> createTask(@RequestBody Task task) {
    	taskService.createTask(task);
       // return "Success";
    	  return ResponseEntity.ok(Map.of("message", "Success"));
    }
    
//    @PostMapping("/tasks")
//    @PreAuthorize("hasRole('MANAGER')")
//    public String createTask(@RequestBody TaskDTO taskDTO) {
//        Task task = new Task();
//        task.setDescription(taskDTO.getDescription());
//        task.setStatus(taskDTO.getStatus());
//        
//        // Fetching users by ID for assignedTo and assignedBy
//        User assignedTo = userService.getUserById(taskDTO.getAssignedToUserId());
//        User assignedBy = userService.getUserById(taskDTO.getAssignedByUserId());
//
//        task.setAssignedTo(assignedTo);
//        task.setAssignedBy(assignedBy);
//        task.setDueDate(taskDTO.getDueDate());
//
//        taskService.createTask(task);
//        return "Task Created Successfully!";
//    }


    @PutMapping("/tasks/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Integer id, @RequestBody String status) {
    	String cleanedStatus = status.trim().replaceAll("[\"{}\\s]", "");
        Task updatedTask = taskService.updateTaskStatus(id, cleanedStatus);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
//    @PatchMapping("/tasks/{id}/comment")
//    @PreAuthorize("hasRole('MANAGER')")
//    public ResponseEntity<?> updateTaskComment(@PathVariable Integer id, @RequestBody Map<String, String> requestBody) {
//        try {
//            // Extract the 'comment' field from the request body
//            String comment = requestBody.get("comment");
//
//            // Update the task comment
//            Task updatedTask = taskService.updateTaskComment(id, comment);
//
//            // Return a success response
//            return ResponseEntity.ok(Map.of(
//                "message", "Comment updated successfully.",
//                "updatedComment", updatedTask.getComment()
//            ));
//        } catch (IllegalArgumentException e) {
//            // Handle invalid input (e.g., empty comment)
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
//                "error", e.getMessage()
//            ));
//        } catch (RuntimeException e) {
//            // Handle other runtime exceptions
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
//                "error", e.getMessage()
//            ));
//        } catch (Exception e) {
//            // Handle unexpected exceptions
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
//                "error", "An unexpected error occurred: " + e.getMessage()
//            ));
//        }
//    }

    
    @PatchMapping("/tasks/{id}/comment")
    public ResponseEntity<?> updateTaskComment(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> payload) {
        try {
            String comment = (String) payload.get("comment");
            String emailId = (String) payload.get("emailId");
            taskService.updateTaskComment(id, comment, emailId);
            return ResponseEntity.ok("Comment updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    
//    @PatchMapping("/tasks/{taskId}/comment")
//    public ResponseEntity<String> updateComment(@PathVariable Integer taskId, @RequestBody Map<String, String> requestBody) {
//        String newComment = requestBody.get("comment");
//        Task updatedTask = taskService.updateTaskComment(taskId, newComment);
//
//        return ResponseEntity.ok("Comment updated successfully!");
//    }


    
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


//    @PutMapping("/update-due-date/{id}")
//    public ResponseEntity<String> patchTaskDueDate(@PathVariable Integer id, @RequestBody Map<String, String> requestBody) {
//        try {
//            String dueDateString = requestBody.get("dueDate");
//            LocalDate parsedDueDate = LocalDate.parse(dueDateString);
//            taskService.updateTaskDueDate(id, parsedDueDate);
//            return ResponseEntity.ok("Due date patched successfully for Task ID: " + id);
//        } catch (DateTimeParseException e) {
//            return ResponseEntity.badRequest().body("Invalid date format. Please use yyyy-MM-dd.");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error patching due date: " + e.getMessage());
//        }
//    }
    
    
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete task.");
        }
    }
    
    @GetMapping("/tasks/assignedByManager")
    @PreAuthorize("hasRole('MANAGER')") // Only managers can call this endpoint
    public ResponseEntity<?> getTasksAssignedByManager() {
        try {
            // Extract username of logged-in user
            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            List<Task> tasks = taskService.getTasksAssignedByManager(username);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching tasks: " + e.getMessage());
        }
    }

//    @DeleteMapping("/tasks/{id}")
//    public void deleteTask(@PathVariable Integer id) {
//        taskService.deleteTask(id);
//    }
}
