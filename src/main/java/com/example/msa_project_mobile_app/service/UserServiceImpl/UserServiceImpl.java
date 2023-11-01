package com.example.msa_project_mobile_app.service.UserServiceImpl;

import com.example.msa_project_mobile_app.dto.UserDTO;
import com.example.msa_project_mobile_app.models.User;
import com.example.msa_project_mobile_app.repositories.UserRepository;
import com.example.msa_project_mobile_app.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse createUser(UserDTO userDTO) {

        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        if(existingUser != null)
            return new LoginResponse(false, "Email Address already exist!");
        if(userDTO.getPassword().length() < 10)
            return new LoginResponse(false, "Password must have more the 10 characters");
        if(!"1234567890".contains(userDTO.getPassword()))
            return new LoginResponse(false, "Must contain at least 1 number");
        if(!userDTO.getEmail().contains("@"))
            return new LoginResponse(false, "Invalid email address");
        User user = User.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getFirstName())
                .build();
        userRepository.save(user);

        return new LoginResponse(true, "Account created!");
    }

    public LoginResponse login(UserDTO userDTO)
    {
        User searchedUser = userRepository.findByEmail(userDTO.getEmail());
        if(searchedUser != null)
        {
            if(passwordEncoder.matches(userDTO.getPassword(), searchedUser.getPassword()))
            {
                return new LoginResponse(true, "Login Success!");
            }
            else
            {
                return new LoginResponse(false, "Invalid password!");
            }
        }
        else
        {
            return new LoginResponse(false, "Email address doesn't exist");
        }
    }
}
