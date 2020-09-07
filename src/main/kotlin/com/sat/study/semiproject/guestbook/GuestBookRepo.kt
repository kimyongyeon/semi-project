package com.sat.study.semiproject.guestbook

import org.springframework.data.jpa.repository.JpaRepository

interface GuestBookRepo: JpaRepository<GuestBookEntity, Long> {
}