package com.example.msa_project_mobile_app.transformers;

import com.example.msa_project_mobile_app.dto.UserDTO;
import com.example.msa_project_mobile_app.models.User;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserTransformer {

    public static UserDTO mapUserToUserDTO(User user)
    {
        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .firstName(user.getFirstName())
                .lastName(user.getFirstName())
                .build();
        return userDTO;
    }

    public static  User mapUserDTOtoUser(UserDTO userDTO)
    {
        User user = User.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getFirstName())
                .build();
        return user;
    }
}
