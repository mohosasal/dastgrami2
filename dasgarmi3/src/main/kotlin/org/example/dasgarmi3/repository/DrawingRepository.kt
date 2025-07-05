package org.example.dasgarmi3.repository

import org.example.dasgarmi3.model.Drawing
import org.springframework.data.jpa.repository.JpaRepository

interface DrawingRepository : JpaRepository<Drawing, String>
