package com.sat.study.semiproject

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class SemiProjectApplication

fun main(args: Array<String>) {
    runApplication<SemiProjectApplication>(*args)
}
