package com.demo.springapi.controller;

import com.demo.springapi.model.User;
import com.demo.springapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id){
        Optional user = userService.getUser(id);
        if(user.isPresent()){
            return (User) user.get();
        }
                return  null;
    }
    @GetMapping()
    public List<User> getAllUser(){
        return userService.getAllUser();
    }
    @PostMapping()
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id){
        return userService.deleteByID(id);
    }
}
