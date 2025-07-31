package org.example.dasgarmi3.model

import jakarta.persistence.*

@Entity
data class Drawing(
    @Id
    val id: String,
    @Lob
    var data: String
)
