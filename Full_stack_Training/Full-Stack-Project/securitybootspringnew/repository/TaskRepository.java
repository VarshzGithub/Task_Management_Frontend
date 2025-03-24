package com.spring.bootsecuirty.secuirtybootspringnew.repository;

import com.spring.bootsecuirty.secuirtybootspringnew.model.Task;
import com.spring.bootsecuirty.secuirtybootspringnew.model.User;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
	// Method to find tasks assigned to the current lead
    List<Task> findByAssignedTo(User assignedTo);

    // Method to find tasks assigned by the current lead to others
    List<Task> findByAssignedBy(User assignedBy);
    
    List<Task> findByDueDate(LocalDate dueDate);
}
