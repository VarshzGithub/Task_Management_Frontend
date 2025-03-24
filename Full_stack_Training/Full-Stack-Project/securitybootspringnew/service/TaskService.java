package com.spring.bootsecuirty.secuirtybootspringnew.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.spring.bootsecuirty.secuirtybootspringnew.model.Task;
import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
import com.spring.bootsecuirty.secuirtybootspringnew.repository.TaskRepository;
import com.spring.bootsecuirty.secuirtybootspringnew.repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    

    public List<Task> getTasksAssignedToMe() {
        User currentUser = getCurrentUser();
        System.out.println("heyyyyyy");
        return taskRepository.findByAssignedTo(currentUser);
    }

   
    public List<Task> getTasksAssignedByLead() {
        User currentUser = getCurrentUser();
        return taskRepository.findByAssignedBy(currentUser);
    }
    
    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;

       
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername(); 
        } else {
            email = principal.toString(); 
        }
        
        System.out.println("Current user email: " + email);
        
        
        Optional<User> userOptional = userRepository.findByEmail(email);
        System.out.println("User found: " + userOptional.isPresent());

        return userOptional.orElse(null); // Return the user if present, else return null
    }


    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Integer id) {
        return taskRepository.findById(id).orElse(null);
    }
    
	public Task createTask(Task task) {
	   // task.setComment(null);
        return taskRepository.save(task);
    }
  
	public Task updateTaskStatus(Integer id, String status) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setStatus(status);
            return taskRepository.save(task);
        }
        return null;
    }
	

	public Task updateTaskComment(Integer taskId, String comment, String emailId) {
	    Task existingTask = taskRepository.findById(taskId)
	        .orElseThrow(() -> new RuntimeException("Task not found"));

	    System.out.println("Appending comment by user: " + emailId);

	    String formattedComment = "User " + emailId + ": " + comment;
	    String existingComments = existingTask.getComment();
	    String updatedComments = (existingComments != null ? existingComments + "\n" : "") + formattedComment;

	    existingTask.setComment(updatedComments);

	    return taskRepository.save(existingTask);
	}


	
//	public Task updateTaskComment(Integer taskId, String comment, String emailId) {
//	    Task existingTask = taskRepository.findById(taskId)
//	        .orElseThrow(() -> new RuntimeException("Task not found"));
//
//	    // Format the new comment with the user ID
//	    String formattedComment = "User " + emailId + ": " + comment;
//
//	    // Append the new comment to existing comments
//	    String existingComments = existingTask.getComment();
//	    String updatedComments = (existingComments != null ? existingComments + "\n" : "") + formattedComment;
//
//	    // Update the task
//	    existingTask.setComment(updatedComments);
//
//	    return taskRepository.save(existingTask);
//	}




	public void deleteTask(Integer id) {
	    if (!taskRepository.existsById(id)) {
	        throw new EmptyResultDataAccessException("Task not found", 1);
	    }
	    taskRepository.deleteById(id);
	}

//    public void deleteTask(Integer id) {
//        taskRepository.deleteById(id);
//    }
    
//    public void addCommentToTask(Integer id, String comment) {
//        Task task = taskRepository.findById(id).orElse(null);
//        if(task!=null) {
//        	 task.setComment(comment); 
//             taskRepository.save(task);
//        }
//    }
	public List<Task> getTasksAssignedByManager(String managerEmail) {
	    Optional<User> manager = userRepository.findByEmail(managerEmail);
	    if (manager.isPresent()) {
	        return taskRepository.findByAssignedBy(manager.get());
	    }
	    throw new RuntimeException("Manager not found with email: " + managerEmail);
	}

    
    
    
    public void updateTaskDueDate(Integer id, LocalDate dueDate, String loggedInUsername) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));

        // Check if the logged-in user is the one who assigned the task
        if (!task.getAssignedBy().getUsername().equals(loggedInUsername)) {
            throw new SecurityException("You are not authorized to update this task's due date.");
        }

        // Update the due date if authorized
        task.setDueDate(dueDate);
        taskRepository.save(task);
    }
    
//    public void updateTaskDueDate(Integer id, LocalDate dueDate) {
//    	Task task = taskRepository.findById(id).orElse(null);
//    	task.setDueDate(dueDate);
//    	taskRepository.save(task);
//    }
}
