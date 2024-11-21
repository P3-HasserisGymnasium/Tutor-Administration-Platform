package project.backend.utilities;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;


public class JWTUtil {

      private static final String SECRET_KEY = "your-secret-key";

      private static final long EXPIRATION_TIME = 1000 * 60 * 60;
  
    @SuppressWarnings("deprecation")
    public static String generateToken(String user_id) {
          Date now = new Date();
          Date expiration = new Date(now.getTime() + EXPIRATION_TIME);
  
          return Jwts.builder()
                  .setSubject(user_id)
                  .setIssuedAt(now)
                  .setExpiration(expiration)
                  .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                  .compact();
      }
  
    @SuppressWarnings("deprecation")
    public static Claims extractClaims(String token) {
          return Jwts.parser()
                  .setSigningKey(SECRET_KEY)
                  .parseClaimsJws(token)
                  .getBody();
      }
  
      public static boolean isTokenExpired(String token) {
          return extractClaims(token).getExpiration().before(new Date());
      }
  
      public static boolean validateToken(String token, String user_id) {
          return (user_id.equals(extractClaims(token).getSubject()) && !isTokenExpired(token));
      }
  }