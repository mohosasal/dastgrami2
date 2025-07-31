package org.example.dasgarmi3.Configs

import org.example.dasgarmi3.model.AppUser
import org.example.dasgarmi3.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class StartupConfig {

    @Bean
    fun seedUsers(userRepo: UserRepository) = CommandLineRunner {
        val presetAppUsers = listOf(
            AppUser("salim", "salim123"),
            AppUser("alice", "wonderland"),
        )
        presetAppUsers.forEach { userRepo.save(it) }
    }
}
