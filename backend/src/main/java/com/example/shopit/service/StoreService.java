package com.example.shopit.service;

import com.example.shopit.dto.InventoryDto;
import com.example.shopit.dto.SearchResultDto;
import com.example.shopit.entity.Inventory;
import com.example.shopit.entity.Store;
import com.example.shopit.repository.InventoryRepository;
import com.example.shopit.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {
    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<SearchResultDto> searchNearbyStores(String query, Double lat, Double lng, Double radius) {
        return storeRepository.findNearbyStoresWithProduct(query, lat, lng, radius);
    }

    public Optional<Store> getStoreById(Long storeId) {
        return storeRepository.findById(storeId);
    }

    public List<InventoryDto> getStoreInventory(Long storeId) {
        return inventoryRepository.findByStoreIdWithProducts(storeId);
    }
}
