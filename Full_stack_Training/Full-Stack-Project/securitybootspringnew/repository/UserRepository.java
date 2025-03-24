package com.spring.bootsecuirty.secuirtybootspringnew.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.bootsecuirty.secuirtybootspringnew.model.User;


public interface UserRepository extends JpaRepository<User, Integer>{

     Optional<User> findByEmail(String Email);
	//List<User> findByEmail(String Email);
     
     Optional<User> findByUsername(String name);

}
