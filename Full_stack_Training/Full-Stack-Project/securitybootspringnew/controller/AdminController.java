package com.spring.bootsecuirty.secuirtybootspringnew.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.bootsecuirty.secuirtybootspringnew.model.Task;
import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
import com.spring.bootsecuirty.secuirtybootspringnew.service.TaskService;
import com.spring.bootsecuirty.secuirtybootspringnew.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	 @Autowired
	 private TaskService taskService;
	 
	 @Autowired
	 private UserService userService;
	 
	@GetMapping("/check")
	public String checker()
	{
		return "Welcome admin home page";
	}

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

   
//    @PostMapping("/users")
//    public User createUser(@RequestBody User user) {
//        return userService.createUser(user);
//    }
//
//
//    @PutMapping("/users/{id}")
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

    
//    @PostMapping("/tasks")
//    @PreAuthorize("hasRole('ADMIN')")
//    public String createTask(@RequestBody Task task) {
//    	taskService.createTask(task);
//        return "Success";
//    }
//
//    @PutMapping("/tasks/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Task> updateTaskStatus(@PathVariable Integer id, @RequestBody String status) {
//    	String cleanedStatus = status.trim().replaceAll("[\"{}\\s]", "");
//        Task updatedTask = taskService.updateTaskStatus(id, cleanedStatus);
//        if (updatedTask != null) {
//            return ResponseEntity.ok(updatedTask);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }
}
