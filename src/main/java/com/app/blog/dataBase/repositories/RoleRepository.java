package com.app.blog.dataBase.repositories;

import com.app.blog.dataBase.models.Roles;
import com.app.blog.dataBase.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Roles name);
}