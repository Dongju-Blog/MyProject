package com.myapp.core.entity;


import com.myapp.core.constant.Role;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;




import javax.persistence.*;

@Table(name="`user`")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;

    @Column(nullable = false, updatable = false)
    private String name;

    @Column(nullable=false, unique=true, updatable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;




    public void encodePassword(PasswordEncoder passwordEncoder) {
//        SecurityConfig securityConfig = new SecurityConfig();
//        this.password = securityConfig.passwordEncoder().encode(password);
        this.password = passwordEncoder.encode(password);
    }



}