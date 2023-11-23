package com.example.msa_project_mobile_app.config;

import com.example.msa_project_mobile_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig
{

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() throws UsernameNotFoundException
    {
        return username -> userRepository.findByUsername(username);
    }
}
