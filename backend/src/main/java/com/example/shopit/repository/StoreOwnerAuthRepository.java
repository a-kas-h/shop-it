package com.example.shopit.repository;

import com.example.shopit.entity.StoreOwnerAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreOwnerAuthRepository extends JpaRepository<StoreOwnerAuth, Long> {
    Optional<StoreOwnerAuth> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<StoreOwnerAuth> findByEmailAndIsActive(String email, Boolean isActive);
}
