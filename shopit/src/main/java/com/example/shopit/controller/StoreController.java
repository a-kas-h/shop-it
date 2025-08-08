package com.example.shopit.controller;


import com.example.shopit.dto.InventoryDto;
import com.example.shopit.dto.SearchResultDto;
import com.example.shopit.entity.Store;
import com.example.shopit.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StoreController {
    @Autowired
    private StoreService storeService;

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchStores(
            @RequestParam String query,
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam(defaultValue = "10") Double radius){

        if (query == null || query.trim().isEmpty() ||lat == null || lng == null){
            Map<String, String> error = new HashMap<>();
            error.put("error", "Missing parameters: query, lat, lng");
            return ResponseEntity.badRequest().body(error);
        }

        try{
            List<SearchResultDto> results = storeService.searchNearbyStores(query, lat, lng, radius);
            return ResponseEntity.ok(results);
        }catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Server Error");
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/stores/{storeId}")
    public ResponseEntity<?> getStoreDetails(@PathVariable Long storeId) {
        try{
            Optional<Store> storeOpt = storeService.getStoreById(storeId);
            if (storeOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Store not found");
                return ResponseEntity.status(404).body(error);
            }
            Store store = storeOpt.get();
            List<InventoryDto> inventory = storeService.getStoreInventory(storeId);

            Map<String, Object> response = new HashMap<>();
            response.put("id", store.getId());
            response.put("name", store.getName());
            response.put("address", store.getAddress());
            response.put("latitude", store.getLatitude());
            response.put("longitude", store.getLongitude());
            response.put("inventory", inventory);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Server Error");
            return ResponseEntity.internalServerError().body(error);
        }
    }

}
