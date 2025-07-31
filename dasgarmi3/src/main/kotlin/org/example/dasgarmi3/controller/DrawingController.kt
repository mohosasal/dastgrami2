package org.example.dasgarmi3.controller

import org.example.dasgarmi3.model.Drawing
import org.example.dasgarmi3.repository.DrawingRepository
import org.example.dasgarmi3.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:5173"])

@RestController
@RequestMapping("/api/drawing")
class DrawingController(
    val drawingRepo: DrawingRepository,
    val userRepo: UserRepository
) {

    @GetMapping("/{username}")
    fun getDrawing(@PathVariable username: String): ResponseEntity<String>? =
        userRepo.findById(username)
            .flatMap { it.drawingId?.let(drawingRepo::findById) }
            .map { ResponseEntity.ok(it.data) }
            .orElse(ResponseEntity.notFound().build())

    @PostMapping("/{username}")
    fun saveDrawing(@PathVariable username: String, @RequestBody data: String): ResponseEntity<Any> {
        val drawing = Drawing(id = username, data = data)
        drawingRepo.save(drawing)

        val user = userRepo.findById(username)
        user.ifPresent { it.drawingId = drawing.id; userRepo.save(it) }
        return ResponseEntity.ok(mapOf("status" to "saved"))
    }
}

