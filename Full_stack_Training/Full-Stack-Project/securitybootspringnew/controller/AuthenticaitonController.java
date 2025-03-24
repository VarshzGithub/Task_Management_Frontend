package com.spring.bootsecuirty.secuirtybootspringnew.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bootsecuirty.secuirtybootspringnew.model.AuthenticationRequest;
import com.spring.bootsecuirty.secuirtybootspringnew.model.AuthenticationResponse;
import com.spring.bootsecuirty.secuirtybootspringnew.model.RegisterRequest;
import com.spring.bootsecuirty.secuirtybootspringnew.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthenticaitonController {

	@Autowired
	public AuthenticationService authenticationService;
	
	@PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest user) {
		//System.out.println(user.getRole()+"       "+"sdfdsfdsfdsfsdf");
        // Register a new user with the specified role
       // return authenticationService.register(user);
		String token = authenticationService.register(user);
	    AuthenticationResponse response = new AuthenticationResponse();
	    response.setToken(token);
	    return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginauthenticate(@RequestBody AuthenticationRequest request) {
        // Authenticate the user and return a token
        //return authenticationService.authenticate(request);
    	 String token = authenticationService.authenticate(request);
    	    AuthenticationResponse response = new AuthenticationResponse();
    	    response.setToken(token);
    	    return ResponseEntity.ok(response);
    }
	
}
