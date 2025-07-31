package org.example.dasgarmi3.Configs

import org.example.dasgarmi3.model.User
import org.example.dasgarmi3.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class StartupConfig {

    @Bean
    fun seedUsers(userRepo: UserRepository) = CommandLineRunner {
        val presetUsers = listOf(
            User("salim", "salim123"),
            User("mehrshad", "pass123"),
            User("alice", "wonderland"),
        )
        presetUsers.forEach { userRepo.save(it) }
    }
}
