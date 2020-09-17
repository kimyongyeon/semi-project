package com.sat.study.semiproject.booking

import org.springframework.data.jpa.repository.JpaRepository

interface BookingRepo : JpaRepository<BookingEntity, Long> {
    fun findFirstByUserName(userName: String)
}