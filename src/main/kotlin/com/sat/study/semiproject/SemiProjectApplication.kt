package com.sat.study.semiproject

import com.sat.study.semiproject.booking.BookingEntity
import com.sat.study.semiproject.booking.BookingRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class SemiProjectApplication: ApplicationRunner {

    @Autowired
    lateinit var bookingRepo: BookingRepo

    override fun run(args: ApplicationArguments?) {
        var bookingEntity = BookingEntity(0L)
        for (i in 1..10) {
            bookingEntity.userName = "user" + i
            bookingRepo.save(bookingEntity)
        }
    }

}

fun main(args: Array<String>) {
    runApplication<SemiProjectApplication>(*args)
}



