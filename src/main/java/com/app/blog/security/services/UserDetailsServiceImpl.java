package com.app.blog.security.services;

import com.app.blog.security.exceptions.UserEmailNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.blog.dataBase.repositories.UserRepository;
import com.app.blog.dataBase.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Transactional
    public UserDetails loadUserByEmail(String email) throws UserEmailNotFoundException {
        User user = userRepository.findByEmail(email).
                orElseThrow(() -> new UserEmailNotFoundException("User Not Found with email: " + email)
        );
        return UserDetailsImpl.build(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return loadUserByEmail(username);
    }
}
