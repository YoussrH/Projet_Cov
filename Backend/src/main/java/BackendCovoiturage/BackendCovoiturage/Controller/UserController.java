package BackendCovoiturage.BackendCovoiturage.Controller;

import BackendCovoiturage.BackendCovoiturage.DTO.LoginRequest;
import BackendCovoiturage.BackendCovoiturage.Entity.User;
import BackendCovoiturage.BackendCovoiturage.Entity.Driver;
import BackendCovoiturage.BackendCovoiturage.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = Logger.getLogger(UserController.class.getName());

    @Autowired
    private UserService userService;

    @PostMapping("/become-driver/{userId}")
    public ResponseEntity<String> becomeDriver(@PathVariable Long userId, @RequestBody Driver driverDetails) {
        try {
            userService.requestToBecomeDriver(userId, driverDetails);
            return ResponseEntity.ok("Driver request submitted successfully.");
        } catch (IllegalArgumentException e) {
            logger.severe("Error in becomeDriver: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/adduser")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            userService.addUser(user);
            return ResponseEntity.ok("User registered successfully.");
        } catch (Exception e) {
            logger.severe("Error in addUser: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Extract email and password from the loginRequest DTO
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            // Authenticate the user
            User user = userService.authenticate(email, password);
            if (user != null) {
                return ResponseEntity.ok("Login successful! Welcome " + user.getEmail());
            } else {
                return ResponseEntity.badRequest().body("Invalid credentials!");
            }
        } catch (Exception e) {
            logger.severe("Error in login: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.severe("Error in getAllUsers: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (Exception e) {
            logger.severe("Error in deleteUser: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }
}