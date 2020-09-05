package com.sat.study.semiproject

import org.springframework.data.jpa.repository.JpaRepository

interface BizRepo: JpaRepository<BizEntity, Long> {
    fun findByName(name: String): BizEntity // select * from biz where name = 'n'
}
