package com.example.shopit.repository;

import com.example.shopit.dto.InventoryDto;
import com.example.shopit.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    @Query("""
        SELECT new com.example.shopit.dto.InventoryDto(
            p.id, 
            p.name, 
            p.description,
            p.category,
            p.imageUrl,
            i.quantity, 
            i.price,
            p.manufacturingDate,
            p.expiryDate
        )
        FROM Inventory i
        JOIN i.product p
        WHERE i.store.id = :storeId
        AND i.quantity > 0
        ORDER BY p.category, p.name
        """)
    List<InventoryDto> findByStoreIdWithProducts(@Param("storeId") Long storeId);

    List<Inventory> findByStoreId(Long storeId);
    
    Optional<Inventory> findByStoreIdAndProductId(Long storeId, Long productId);

}
