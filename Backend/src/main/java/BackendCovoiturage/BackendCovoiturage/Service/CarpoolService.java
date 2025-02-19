
package BackendCovoiturage.BackendCovoiturage.Service;

import BackendCovoiturage.BackendCovoiturage.Entity.Carpool;
import BackendCovoiturage.BackendCovoiturage.Repository.CarpoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarpoolService {

    private final CarpoolRepository carpoolRepository;
    // Method to add a new carpool
    public Carpool addCarpool(Carpool carpool) {
        return carpoolRepository.save(carpool);
    }
    @Autowired
    public CarpoolService(CarpoolRepository carpoolRepository) {
        this.carpoolRepository = carpoolRepository;
    }
  
    public List<Carpool> getAllCarpools() {
        return carpoolRepository.findAll();
    }
    public Optional<Carpool> getCarpoolById(Long id) {
        return carpoolRepository.findById(id);
    }


        public List<Carpool> searchCarpools(String location, String destination, String date) {
            // Fetch all carpools from the database
            List<Carpool> carpools = carpoolRepository.findAll();

            // If no filters are provided, return all carpools
            if (location == null && destination == null && date == null) {
                return carpools;
            }

            // Filter based on location, destination, and date
            if (location != null) {
                carpools = carpools.stream()
                        .filter(c -> c.getDepartureCity().equalsIgnoreCase(location) || c.getArrivalCity().equalsIgnoreCase(location))
                        .collect(Collectors.toList());
            }
            if (destination != null) {
                carpools = carpools.stream()
                        .filter(c -> c.getArrivalCity().equalsIgnoreCase(destination))
                        .collect(Collectors.toList());
            }
            if (date != null) {
                try {
                    // Parse the date and filter carpools with the same departure date
                    Date filterDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
                    carpools = carpools.stream()
                            .filter(c -> c.getDepartureTime().equals(filterDate))
                            .collect(Collectors.toList());
                } catch (Exception e) {
                    e.printStackTrace();
                    // Handle parsing exception if the date format is incorrect
                }
            }
            return carpools;
        }

}

