package com.spring.bootsecuirty.secuirtybootspringnew.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.spring.bootsecuirty.secuirtybootspringnew.model.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	public String extractusername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public static final String secret_key = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

	public Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
	}

	public String generatetoken(UserDetails userdetails) {
		return generatetoken(new HashMap<>(), userdetails);
	}

	public boolean isTokenValid(String token, UserDetails userdetails) {
		return extractExpiration(token).after(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);

	}

	public String generatetoken(

			Map<String, Object> extractClaims, UserDetails userdetails) {
		return Jwts.builder()
				.setClaims(extractClaims)
				.setSubject(userdetails.getUsername())
				.claim("ROLE", userdetails.getAuthorities())
				.setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))//1week
				.signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();

	}

	public Key getSignInKey() {
		byte[] keybytes = Decoders.BASE64.decode(secret_key);
		return Keys.hmacShaKeyFor(keybytes);
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaims(token);
		return claimResolver.apply(claims);
	}
}
