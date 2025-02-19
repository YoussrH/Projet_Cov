package BackendCovoiturage.BackendCovoiturage.Controller;

import BackendCovoiturage.BackendCovoiturage.Service.DriverService;
import BackendCovoiturage.BackendCovoiturage.Service.UserService;
import BackendCovoiturage.BackendCovoiturage.Service.CarpoolService;
import BackendCovoiturage.BackendCovoiturage.Entity.AdminRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private DriverService driverService;
    @Autowired
    private CarpoolService carpoolService;


    @GetMapping("/drivers")
    public ResponseEntity<List<AdminRequest>> getAllDriverRequests() {
        List<AdminRequest> driverRequests = userService.getAllDriverRequests();
        return ResponseEntity.ok(driverRequests);
    }

    @PostMapping("/approve-driver/{requestId}")
    public ResponseEntity<String> approveDriverRequest(@PathVariable Long requestId, @RequestParam boolean isApproved) {
        try {
            userService.approveDriverRequest(requestId, isApproved);
            String message = isApproved ? "Driver request approved." : "Driver request rejected.";
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-driver/{driverId}")
    public ResponseEntity<String> deleteDriver(@PathVariable Long driverId) {
        try {
            driverService.deleteDriver(driverId);
            return ResponseEntity.ok("Driver deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting driver: " + e.getMessage());
        }
    }

    @GetMapping("/carpools")
    public ResponseEntity<?> getAllCarpools() {
        try {

            return ResponseEntity.ok(carpoolService.getAllCarpools());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching carpools: " + e.getMessage());
        }
    }
}