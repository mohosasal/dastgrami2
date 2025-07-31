package org.example.dasgarmi3.controller

import org.example.dasgarmi3.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(val userRepo: UserRepository) {

    data class LoginRequest(val username: String, val password: String)

    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): ResponseEntity<Any> {
        val user = userRepo.findById(req.username)
        return if (user.isPresent && user.get().password == req.password) {
            ResponseEntity.ok(mapOf("username" to req.username))
        } else {
            ResponseEntity.status(401).body(mapOf("error" to "Invalid credentials"))
        }
    }
}
