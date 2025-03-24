//package com.spring.bootsecuirty.secuirtybootspringnew.service;
//
//import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
//import com.spring.bootsecuirty.secuirtybootspringnew.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // Fetch all users
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    // Fetch a specific user by ID
//    public User getUserById(Integer id) {
//        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
//    }
//
//    // Create a new user
//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    // Update an existing user
//    public User updateUser(Integer id, User updatedUser) {
//        User existingUser = getUserById(id);
//        existingUser.setName(updatedUser.getName());
//        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setRole(updatedUser.getRole());
//        existingUser.setPassword(updatedUser.getPassword()); // Consider encoding password here if updated
//        return userRepository.save(existingUser);
//    }
//
//    // Delete a user
//    public void deleteUser(Integer id) {
//        userRepository.deleteById(id);
//    }
//}

package com.spring.bootsecuirty.secuirtybootspringnew.service;

import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
import com.spring.bootsecuirty.secuirtybootspringnew.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Add this import
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch a specific user by ID
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Create a new user
    public User createUser(User user) {
        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Update an existing user
    public User updateUser(Integer id, User updatedUser) {
    	 System.out.println("Received updated user: " + updatedUser); 
        User existingUser = getUserById(id);
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setRole(updatedUser.getRole());

        // Only encode if the password is updated
//        if (!updatedUser.getPassword().equals(existingUser.getPassword())) {
//            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
//        }
        User updated=userRepository.save(existingUser);
        System.out.println("User updated successfully: " + updated);
        return updated;
    }

    // Delete a user
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}

