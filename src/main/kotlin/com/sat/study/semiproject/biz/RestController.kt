package com.sat.study.semiproject.biz

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class RestController {

    @Autowired
    lateinit var bizRepo: BizRepo

    data class BizForm (
            var id: Long,
            var name: String,
            var phone: String,
            var corp: String
    )



    @PostMapping("/biz/save")
    fun bizSave(bizForm: BizForm): BizForm {
        println(bizForm)
        var bizEntity = BizEntity(null, "", "", "", Date(), "", "")
        bizEntity.name = bizForm.name
        bizEntity.phone = bizForm.phone
        bizEntity.corp = bizForm.corp
        bizRepo.save(bizEntity)
        return bizForm
    }

    @PostMapping("/biz/edit")
    fun bizEdit(bizForm: BizForm): BizForm {
        println(bizForm)
        var bizEntity = BizEntity(0L, "", "", "", Date(), "", "")
        bizEntity.id = bizForm.id
        bizEntity.name = bizForm.name
        bizEntity.phone = bizForm.phone
        bizEntity.corp = bizForm.corp
        bizRepo.save(bizEntity)
        return bizForm
    }

    @PostMapping("/biz/delete")
    fun bizDel(id: Long): Long {
        var bizEntity: BizEntity = bizRepo.findById(id).get()
        bizRepo.delete(bizEntity)
        return id
    }

    @PostMapping("/biz/deleteName")
    fun bizDel(name: String): String {
        var bizEntity: BizEntity = bizRepo.findFirstByName(name)
        bizRepo.delete(bizEntity)
        return name
    }

    @GetMapping("/biz/search")
    fun bizSearch(): MutableList<BizEntity> {
        return bizRepo.findAll()
    }

    @GetMapping("/biz/detail")
    fun bizDetail(name: String): BizEntity {
//        val biz = bizRepo.findByName(name)
//        print(biz)
//
//        if (biz.size > 1) {
//            return BizEntity(0L, "데이터가 2개 이상 입니다.", "", "", Date(), "error", biz.toString())
//        }
        return bizRepo.findFirstByName(name)
    }



}