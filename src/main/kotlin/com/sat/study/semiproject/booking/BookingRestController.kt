package com.sat.study.semiproject.booking

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

@RestController
class BookingRestController {

    @Autowired
    lateinit var bookingRepo: BookingRepo

    data class BookingForm(
            var name: String,
            var email: String,
            var userId: String,
            var birth: String,
            var startDate: String,
            var startDateTime: String,
            var endDate: String,
            var endDateTime: String
    )

    data class BookingSearch (
        var searchCondition: String,
        var searchKeyword: String
    )

    @GetMapping("/booking/find")
    fun findBooking(@ModelAttribute bookingSearch: BookingSearch): MutableList<BookingEntity> {
        return bookingRepo.findAll()
    }

    @PostMapping("/booking/post")
    fun postBooking(bookingForm: BookingForm) {

        val bookingEntity = BookingEntity(0)
        bookingEntity.userName = bookingForm.name
        bookingEntity.userEmail = bookingForm.email
        bookingEntity.userId = bookingForm.userId

        // String-date to Date, DateTime
        val birth = LocalDate.parse(bookingForm.birth, DateTimeFormatter.ISO_DATE)
        val birthDate = convertLocalDateToDate(birth)

        val startLocalDate = LocalDate.parse(bookingForm.startDate, DateTimeFormatter.ISO_DATE)
        val startLocalDateToDate = convertLocalDateToDate(startLocalDate)
        val startTime = LocalTime.parse(bookingForm.startDateTime)

        val endLocalDate = LocalDate.parse(bookingForm.endDate, DateTimeFormatter.ISO_DATE)
        val endLocalDateToDate = convertLocalDateToDate(endLocalDate)
        val endTime = LocalTime.parse(bookingForm.endDateTime)

        bookingEntity.userBirth = birthDate
        bookingEntity.startDateTime = startLocalDateToDate
        bookingEntity.endDateTime = endLocalDateToDate
        bookingEntity.startDate = startLocalDateToDate
        bookingEntity.startTime = startTime
        bookingEntity.endDate = endLocalDateToDate
        bookingEntity.endTime = endTime

        bookingRepo.save(bookingEntity)
    }

    fun convertToDateViaSqlDate(dateToConvert: LocalDate?): Date? {
        return java.sql.Date.valueOf(dateToConvert)
    }

    fun convertLocalDateToDate(localDate: LocalDate): Date? {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant())
    }
}