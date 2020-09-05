package com.sat.study.semiproject

import java.util.*
import javax.persistence.*

@Entity
data class BizEntity (
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Long?,
        var name: String,
        var phone: String,
        var corp: String,
        @Temporal(TemporalType.DATE) // 2020-08-22
        // @Temporal(TemporalType.TIMESTAMP) // 2020-08-22 00:00:00.000
        var regDate: Date?,

        // 테이블 컬럼은 잡지 않아도 됨. => 화면에서만 사용하는 변수
        @Transient
        var searchCondition: String,
        @Transient
        var searchKeyword: String

)