package com.example.shopit.repository;

import com.example.shopit.dto.SearchResultDto;
import com.example.shopit.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query(value = """
        SELECT new com.example.shopit.dto.SearchResultDto(
            s.id,
            s.name,
            s.address,
            s.latitude,
            s.longitude,
            p.name,
            i.quantity,
            CAST((6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) *\s
                         cos(radians(s.longitude) - radians(:lng)) +\s
                         sin(radians(:lat)) * sin(radians(s.latitude)))) as double)
        )
        FROM Store s
        join s.inventory i
        join i.product p
        where lower(p.name) like lower(concat('%', :query, '%'))
        and i.quantity>0
        and (6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) *\s
                         cos(radians(s.longitude) - radians(:lng)) +\s
                         sin(radians(:lat)) * sin(radians(s.latitude)))) <= :radius
        order by (6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) *\s
                         cos(radians(s.longitude) - radians(:lng)) +\s
                         sin(radians(:lat)) * sin(radians(s.latitude))))
    """)
    List<SearchResultDto> findNearbyStoresWithProduct(
            @Param("query") String query,
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("radius") Double radius
    );
}
