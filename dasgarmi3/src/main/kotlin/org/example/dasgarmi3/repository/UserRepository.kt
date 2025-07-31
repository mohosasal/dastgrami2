package org.example.dasgarmi3.repository

import org.example.dasgarmi3.model.AppUser
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<AppUser, String>
