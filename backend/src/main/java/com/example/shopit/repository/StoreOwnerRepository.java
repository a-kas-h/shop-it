package com.example.shopit.repository;

import com.example.shopit.entity.StoreOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreOwnerRepository extends JpaRepository<StoreOwner, Long> {
    
    @Query("SELECT so FROM StoreOwner so JOIN FETCH so.store WHERE so.storeOwnerAuth.email = :email AND so.isActive = true")
    List<StoreOwner> findActiveStoresByEmail(@Param("email") String email);
    
    @Query("SELECT so FROM StoreOwner so WHERE so.storeOwnerAuth.id = :storeOwnerAuthId AND so.store.id = :storeId AND so.isActive = true")
    Optional<StoreOwner> findByStoreOwnerAuthIdAndStoreId(@Param("storeOwnerAuthId") Long storeOwnerAuthId, @Param("storeId") Long storeId);
    
    @Query("SELECT so FROM StoreOwner so WHERE so.storeOwnerAuth.email = :email AND so.store.id = :storeId AND so.isActive = true")
    Optional<StoreOwner> findByStoreOwnerAuthEmailAndStoreId(@Param("email") String email, @Param("storeId") Long storeId);
    
    List<StoreOwner> findByStoreOwnerAuthIdAndIsActive(Long storeOwnerAuthId, Boolean isActive);
}