package com.example.msa_project_mobile_app.auth;

import com.example.msa_project_mobile_app.config.JwtService;
import com.example.msa_project_mobile_app.dto.UserDTO;
import com.example.msa_project_mobile_app.models.Role;
import com.example.msa_project_mobile_app.models.User;
import com.example.msa_project_mobile_app.repositories.UserRepository;
import com.example.msa_project_mobile_app.transformers.UserTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(UserDTO request) {
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        User user = UserTransformer.mapUserDTOtoUser(request);
        user.setRole(Role.USER);
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())

        );

        User user = repository.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);
        return  AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }
}
