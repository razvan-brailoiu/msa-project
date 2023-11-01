package com.example.msa_project_mobile_app.service.UserServiceImpl;

import com.example.msa_project_mobile_app.dto.UserDTO;
import com.example.msa_project_mobile_app.response.LoginResponse;

public interface UserService{

    LoginResponse createUser(UserDTO userDTO);

    LoginResponse login(UserDTO userDTO);
}
