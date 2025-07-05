package org.example.dasgarmi3.controller

import org.example.dasgarmi3.model.Drawing
import org.example.dasgarmi3.repository.DrawingRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/drawing")
class DrawingController(val repo: DrawingRepository) {

    @GetMapping("/{username}")
    fun getDrawing(@PathVariable username: String): ResponseEntity<String>? =
        repo.findById(username)
            .map { ResponseEntity.ok(it.data) }
            .orElse(ResponseEntity.notFound().build())

    @PostMapping("/{username}")
    fun saveDrawing(
        @PathVariable username: String,
        @RequestBody data: String
    ): ResponseEntity<Any> {
        repo.save(Drawing(username, data))
        return ResponseEntity.ok(mapOf("status" to "saved"))
    }
}
