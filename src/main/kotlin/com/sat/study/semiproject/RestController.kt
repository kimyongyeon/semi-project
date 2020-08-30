package com.sat.study.semiproject

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RestController {

    @Autowired
    lateinit var bizRepo: BizRepo

    data class BizForm (
            var name: String,
            var phone: String,
            var corp: String
    )

    @PostMapping("/biz/save")
    fun bizSave(bizForm: BizForm ): BizForm {
        println(bizForm)
        var bizEntity: BizEntity = BizEntity(null, "", "", "")
        bizEntity.name = bizForm.name
        bizEntity.phone = bizForm.phone
        bizEntity.corp = bizForm.corp
        bizRepo.save(bizEntity)
        return bizForm
    }

    @GetMapping("/biz/search")
    fun bizSearch(): MutableList<BizEntity> {
        return bizRepo.findAll()
    }

    @GetMapping("/biz/detail")
    fun bizDetail(name: String): BizEntity {
        return bizRepo.findByName(name)
    }

}