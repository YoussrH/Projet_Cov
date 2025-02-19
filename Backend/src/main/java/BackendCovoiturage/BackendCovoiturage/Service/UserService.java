package BackendCovoiturage.BackendCovoiturage.Service;

import BackendCovoiturage.BackendCovoiturage.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import BackendCovoiturage.BackendCovoiturage.Entity.AdminRequest;
import BackendCovoiturage.BackendCovoiturage.Entity.Administrator;
import BackendCovoiturage.BackendCovoiturage.Entity.Driver;
import BackendCovoiturage.BackendCovoiturage.Repository.AdminRequestRepository;
import BackendCovoiturage.BackendCovoiturage.Repository.AdministratorRepository;
import BackendCovoiturage.BackendCovoiturage.Repository.DriverRepository;
import BackendCovoiturage.BackendCovoiturage.Repository.UserRepository;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private AdminRequestRepository adminRequestRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AdministratorRepository administratorRepository;
    private static final Logger logger = Logger.getLogger(UserService.class.getName());
    public void requestToBecomeDriver(Long userId, Driver driverDetails) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Administrator admin = administratorRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Invalid admin ID")); // Assuming a single admin for simplicity
        AdminRequest adminRequest = new AdminRequest();
        adminRequest.setUser(user);
        adminRequest.setDriverDetails(driverDetails);
        adminRequest.setStatus("pending");
        adminRequest.setAdministrator(admin);
        adminRequestRepository.save(adminRequest);
    }

    public void approveDriverRequest(Long requestId, boolean isApproved) {
        AdminRequest adminRequest = adminRequestRepository.findById(requestId).orElseThrow(() -> new IllegalArgumentException("Invalid request ID"));
        adminRequest.setStatus(isApproved ? "approved" : "rejected");
        adminRequestRepository.save(adminRequest);
    }
    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password before saving
        return userRepository.save(user);
    }
    // Authenticate user manually
    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email); // Find user by email
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user; // Return user if password matches
        }
        return null; // Return null if no match
    }
    public List<AdminRequest> getAllDriverRequests() {
        return adminRequestRepository.findAll();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}