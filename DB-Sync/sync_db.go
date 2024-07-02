// package main
//
// import (
//
//	"database/sql"
//	"fmt"
//	_ "github.com/go-sql-driver/mysql"
//	"log"
//
// )
//
//	type UserEntity struct {
//		ID                       sql.NullString
//		Email                    sql.NullString
//		Email_Constraint          sql.NullString
//		Email_Verified            sql.NullInt64
//		Enabled                  sql.NullInt64
//		Federation_Link           sql.NullString
//		First_Name                sql.NullString
//		Last_Name                 sql.NullString
//		Realm_ID                  sql.NullString
//		Username                 sql.NullString
//		Created_Timestamp         sql.NullInt64
//		Service_Account_Client_Link sql.NullString
//		Not_Before                sql.NullInt64
//	}
//
//	func fetchDataFromPrimary(db *sql.DB) ([]UserEntity, error) {
//		rows, err := db.Query("SELECT * FROM USER_ENTITY")
//		if err != nil {
//			return nil, err
//		}
//		defer rows.Close()
//
//		var users []UserEntity
//		for rows.Next() {
//			var user UserEntity
//			if err := rows.Scan(&user.ID, &user.Email, &user.Email_Constraint, &user.Email_Verified, &user.Enabled, &user.Federation_Link, &user.First_Name, &user.Last_Name, &user.Realm_ID, &user.Username, &user.Created_Timestamp, &user.Service_Account_Client_Link, &user.Not_Before); err != nil {
//				return nil, err
//			}
//			users = append(users, user)
//		}
//		return users, nil
//	}
//
//	func syncDataToSecondary(db *sql.DB, users []UserEntity) error {
//		for _, user := range users {
//			_, err := db.Exec(`
//	           REPLACE INTO user (EMAIL, EMAIL_CONSTRAINT, EMAIL_VERIFIED, ENABLED, FEDERATION_LINK, FIRST_NAME, LAST_NAME, REALM_ID, USERNAME, CREATED_TIMESTAMP, SERVICE_ACCOUNT_CLIENT_LINK, NOT_BEFORE)
//	           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//				user.Email, user.Email_Constraint, user.Email_Verified, user.Enabled, user.Federation_Link, user.First_Name, user.Last_Name, user.Realm_ID, user.Username, user.Created_Timestamp, user.Service_Account_Client_Link, user.Not_Before)
//			if err != nil {
//				return err
//			}
//		}
//		return nil
//	}
//
//	func main() {
//		primaryDB, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/camp_esprit")
//		if err != nil {
//			log.Fatalf("Failed to connect to primary database: %v", err)
//		}
//		defer primaryDB.Close()
//
//		secondaryDB, err := sql.Open("mysql", "root:root@tcp(localhost:3307)/camp_esprit")
//		if err != nil {
//			log.Fatalf("Failed to connect to secondary database: %v", err)
//		}
//		defer secondaryDB.Close()
//
//		users, err := fetchDataFromPrimary(primaryDB)
//		if err != nil {
//			log.Fatalf("Failed to fetch data from primary database: %v", err)
//		}
//
//		if err := syncDataToSecondary(secondaryDB, users); err != nil {
//			log.Fatalf("Failed to sync data to secondary database: %v", err)
//		}
//
//		fmt.Println("Synchronization complete.")
//	}
package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

type UserEntity struct {
	ID                          string
	Email                       sql.NullString
	Email_Constraint            sql.NullString
	Email_Verified              sql.NullInt64
	Enabled                     sql.NullInt64
	Federation_Link             sql.NullString
	First_Name                  sql.NullString
	Last_Name                   sql.NullString
	Realm_ID                    sql.NullString
	Username                    sql.NullString
	Created_Timestamp           sql.NullInt64
	Service_Account_Client_Link sql.NullString
	Not_Before                  sql.NullInt64
}

func fetchDataFromPrimary(db *sql.DB) ([]UserEntity, error) {
	rows, err := db.Query("SELECT * FROM USER_ENTITY")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []UserEntity
	for rows.Next() {
		var user UserEntity
		if err := rows.Scan(
			&user.ID,
			&user.Email,
			&user.Email_Constraint,
			&user.Email_Verified,
			&user.Enabled,
			&user.Federation_Link,
			&user.First_Name,
			&user.Last_Name,
			&user.Realm_ID,
			&user.Username,
			&user.Created_Timestamp,
			&user.Service_Account_Client_Link,
			&user.Not_Before,
		); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func syncDataToSecondary(db *sql.DB, users []UserEntity) error {
	for _, user := range users {
		_, err := db.Exec(`
            REPLACE INTO User (
                ID, Email, EmailConstraint, EmailVerified, Enabled, FederationLink,
                FirstName, LastName, RealmID, Username, CreatedTimestamp,
                ServiceAccountClientLink, NotBefore
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			user.ID,
			user.Email,
			user.Email_Constraint,
			user.Email_Verified,
			user.Enabled,
			user.Federation_Link,
			user.First_Name,
			user.Last_Name,
			user.Realm_ID,
			user.Username,
			user.Created_Timestamp,
			user.Service_Account_Client_Link,
			user.Not_Before,
		)
		if err != nil {
			return err
		}
	}
	return nil
}

func main() {
	primaryDB, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/camp_esprit")
	if err != nil {
		log.Fatalf("Failed to connect to primary database: %v", err)
	}
	defer primaryDB.Close()

	secondaryDB, err := sql.Open("mysql", "root:root@tcp(localhost:3307)/camp_esprit")
	if err != nil {
		log.Fatalf("Failed to connect to secondary database: %v", err)
	}
	defer secondaryDB.Close()

	users, err := fetchDataFromPrimary(primaryDB)
	if err != nil {
		log.Fatalf("Failed to fetch data from primary database: %v", err)
	}

	if err := syncDataToSecondary(secondaryDB, users); err != nil {
		log.Fatalf("Failed to sync data to secondary database: %v", err)
	}

	fmt.Println("Synchronization complete.")
}
