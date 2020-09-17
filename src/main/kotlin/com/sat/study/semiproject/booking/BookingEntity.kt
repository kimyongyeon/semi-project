package com.sat.study.semiproject.booking

import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import java.time.LocalTime
import java.util.*
import javax.persistence.*

@Entity
@EntityListeners(AuditingEntityListener::class)
data class BookingEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Long?,

        var userName: String? = null,
        var userEmail: String? = null,
        var userId: String? = null,
        @Temporal(TemporalType.DATE) // 2020-08-22
        var userBirth: Date? = null,
        @Enumerated(EnumType.STRING)
        var currentState: BOOKING_STATE? = BOOKING_STATE.WAIT,

        @Temporal(TemporalType.TIMESTAMP) // 2020-08-22 00:00:00.000
        var startDateTime: Date? = null,
        @Temporal(TemporalType.DATE) // 2020-08-22
        var startDate: Date? = null,
        var startTime: LocalTime? = null,

        @Temporal(TemporalType.TIMESTAMP) // 2020-08-22 00:00:00.000
        var endDateTime: Date? = null,
        @Temporal(TemporalType.DATE) // 2020-08-22
        var endDate: Date? = null,
        var endTime: LocalTime? = null,

        @Transient
        var searchCondition: String? = null,
        @Transient
        var searchKeyword: String? = null,

        @LastModifiedDate
        var regDate: LocalDateTime? = null
)