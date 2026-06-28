package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/public")
    public String publicEndpoint(){
        return "Hello from public endpoint";
    }

    @GetMapping("/api/secure")
    public String secureEndpoint(){
        return "Hello from secure endpoint (authenticated)";
    }
}
