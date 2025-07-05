package org.example.dasgarmi3.model

import jakarta.persistence.*

@Entity
data class Drawing(
    @Id
    val username: String,
    @Lob
    var data: String
)
