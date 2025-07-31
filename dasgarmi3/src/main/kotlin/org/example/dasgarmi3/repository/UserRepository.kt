package org.example.dasgarmi3.repository

import org.example.dasgarmi3.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, String>
