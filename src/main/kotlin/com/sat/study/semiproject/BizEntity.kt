package com.sat.study.semiproject

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class BizEntity (
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Long?,
        var name: String,
        var phone: String,
        var corp: String
)