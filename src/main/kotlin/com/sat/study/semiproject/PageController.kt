package com.sat.study.semiproject

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping


@Controller
@RequestMapping("/page")
class PageController {
    @GetMapping("/{page}") // localhost/page/app1
    fun index(@PathVariable page: String): String {
        return page
    }
}