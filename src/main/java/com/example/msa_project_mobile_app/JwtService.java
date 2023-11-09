package com.example.msa_project_mobile_app;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String SECRET_KEY = "7debefe575c16c75899f9990fcded50d316fc8226fded116da7dbcf474fabb04cc3fb5e07cba68efe06aa93caaa1299e8b520c8b22a6e06e58db2d95557b408e";

    public String extractUsername(String token) {
        return null;
    }

//    private Claims extractAllClaims(String token)
//    {
//        return Jwts
//                .parserBuilder()
//                .setSigningKey(getSigningKey())
//                .build()
//                .parseClaimsJwt(token)
//                .getBody();
//    }
}
