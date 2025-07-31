package org.example.dasgarmi3.model

import jakarta.persistence.Entity
import jakarta.persistence.Id


@Entity
data class User(
    @Id
    val username: String,
    var password: String,     // should be hashed but its a simple tamrin !
    var drawingId: String? = null ,
)
