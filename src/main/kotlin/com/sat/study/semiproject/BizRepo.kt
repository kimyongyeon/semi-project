package com.sat.study.semiproject

import org.springframework.data.jpa.repository.JpaRepository

interface BizRepo: JpaRepository<BizEntity, Long> {
    fun findFirstByName(name: String): BizEntity // select * from biz where name = 'n'
    fun findByName(name: String): List<BizEntity>
}
