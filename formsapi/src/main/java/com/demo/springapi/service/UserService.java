package com.demo.springapi.service;

import com.demo.springapi.model.User;
import com.demo.springapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
  private UserRepository userRepository;
    public User createUser(User user) {
      return  userRepository.save(user);
    }
    public List<User> getAllUser() {
        return userRepository.findAll();
    }
    public Optional<User> getUser(Integer id) {
       return userRepository.findById(id);
    }

    public String  deleteByID(int id) {
        userRepository.deleteById(id);
        return  "User Deleted";
    }
}
