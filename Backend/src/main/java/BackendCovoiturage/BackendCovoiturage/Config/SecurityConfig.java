package BackendCovoiturage.BackendCovoiturage.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @SuppressWarnings("deprecation")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Disable security for testing purposes
        http.csrf(csrf -> csrf.disable())
                .authorizeRequests(requests -> requests
                        .anyRequest().permitAll()); // Allow all requests (remove after testing)

        return http.build();
    }
}
