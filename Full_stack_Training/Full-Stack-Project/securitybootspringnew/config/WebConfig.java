
package com.spring.bootsecuirty.secuirtybootspringnew.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.spring.bootsecurity.securitybootspringnew.mixin.GrantedAuthorityMixin;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Angular app origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
    }
    @Bean
    public ObjectMapper objectMapper() {
        // Use Jackson2ObjectMapperBuilder to create a custom ObjectMapper
        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().build();

        // Register the mixin for GrantedAuthority
        SimpleModule module = new SimpleModule();
        module.setMixInAnnotation(GrantedAuthority.class, GrantedAuthorityMixin.class);
        objectMapper.registerModule(module);

        return objectMapper;
    }
}
