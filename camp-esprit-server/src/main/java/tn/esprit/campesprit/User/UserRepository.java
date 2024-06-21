package tn.esprit.campesprit.User;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Transactional
	@Modifying
    @Query("UPDATE User u SET u.firstname = :#{#user.firstname}, u.lastname = :#{#user.lastname}, u.email = :#{#user.email}, u.password = :#{#user.password}, u.birthday = :#{#user.birthday},  u.hobbies = :#{#user.hobbies} WHERE u.id = :#{#user.id}")
    void updateUser(User user);
	
	public User findUserById(Long id);
	
	public User findByEmail(String email);
	
	
	Boolean existsByEmail(String email);

}
