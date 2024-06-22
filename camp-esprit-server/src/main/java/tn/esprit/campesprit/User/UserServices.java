package tn.esprit.campesprit.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServices {

	@Autowired
	UserRepository userRepo;

	// getUserById
	public Optional<User> getUserById(Long id) {

		return userRepo.findById(id);
	};

	// getUserByEmail
	public User getUserByEmail(String email) {

		return userRepo.findByEmail(email);
	};

	// getAllUsers
	public List<User> getAllUsers() {

		return userRepo.findAll();
	};

	// AddUser
	public void addUser(User user) {

		userRepo.save(user);
	};

	// UpdateUser
	public void updateUser(User user) {
		
		userRepo.updateUser(user);
	};

	// DeleteUser
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	};
}
