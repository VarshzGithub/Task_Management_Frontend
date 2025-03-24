package com.spring.bootsecuirty.secuirtybootspringnew.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.bootsecuirty.secuirtybootspringnew.model.AuthenticationRequest;
import com.spring.bootsecuirty.secuirtybootspringnew.model.AuthenticationResponse;
import com.spring.bootsecuirty.secuirtybootspringnew.model.RegisterRequest;
import com.spring.bootsecuirty.secuirtybootspringnew.model.Role;
import com.spring.bootsecuirty.secuirtybootspringnew.model.User;
import com.spring.bootsecuirty.secuirtybootspringnew.repository.UserRepository;

@Service
public class AuthenticationService {

	@Autowired
	public PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserRepository userRepository;
	
	@Autowired
	public JwtService jwtService;
	
	
	@Autowired
	public AuthenticationManager authenticationManager;
	
	public String register(RegisterRequest req) {
        User us  = new User();
		us.setEmail(req.getEmail());
		us.setPassword( passwordEncoder.encode( req.getPassword()));
		us.setName(req.getUsername());
//		us.setRole(Role.ROLE_USER);
	
//System.out.print(Role.ROLE_ADMIN.equals(req.getRole()));
		if (req.getRole() != null) {
            us.setRole(req.getRole());
        }
		 userRepository.save(us);
		 return  jwtService.generatetoken(us);
	}

	public String authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		var user  = userRepository.findByEmail(request.getEmail()).orElseThrow();
		
		return jwtService.generatetoken(user);
	}

	
}
