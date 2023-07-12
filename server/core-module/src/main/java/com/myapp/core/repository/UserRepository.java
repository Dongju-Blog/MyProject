package com.myapp.core.repository;

import com.myapp.core.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    /**
         * User table 에서 Name으로 유저 정보 가져오기
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


    /**
     * User table 에서 Email로 유저 정보 가져오기
     *
     * @param email
     * @return User
     */
    Optional<User> findByEmail(String email);

    /**
     * User table 에서 Name과 Email로 유저 정보 가져오기
     *
     * @param email
     * @return User
     */
    Optional<User> findByNameAndEmail(String name, String email);


    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

}
