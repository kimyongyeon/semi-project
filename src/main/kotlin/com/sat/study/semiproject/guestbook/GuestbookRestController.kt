package com.sat.study.semiproject.guestbook

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GuestbookRestController {

    @Autowired
    lateinit var guestBookRepo: GuestBookRepo;

    data class  GuestForm (
            var id: Long,
            var name: String,
            var memo: String
    )

    @GetMapping("/guestbook/find")
    fun guestBookFind(): MutableList<GuestBookEntity> {
        return guestBookRepo.findAll()
    }

    @PostMapping("/guestbook/save")
    fun guestBookSave(guestForm: GuestForm): GuestForm {
        var guestBookEntity = GuestBookEntity(0, guestForm.name, guestForm.memo)
        guestBookRepo.save(guestBookEntity)
        return guestForm
    }

    @PostMapping("/guestbook/del")
    fun del(): String {
        guestBookRepo.deleteAll();
        return "ok"
    }
}