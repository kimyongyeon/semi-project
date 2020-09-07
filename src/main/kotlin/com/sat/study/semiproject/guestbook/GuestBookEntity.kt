package com.sat.study.semiproject.guestbook

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class GuestBookEntity (
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Long?,
        var name: String,
        var memo: String
)