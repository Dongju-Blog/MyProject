package com.myapp.core.repository;

import com.myapp.core.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    /**
         * User table 에서 이름으로 유저 정보 가져오기
         *
         * @param name
         * @return User
     */
    Optional<User> findByName(String name);

    /**
         * User table 에서 Username으로 유저 정보 가져오기
         *
         * @param username
         * @return User
     */
    Optional<User> findByUsername(String username);



}
