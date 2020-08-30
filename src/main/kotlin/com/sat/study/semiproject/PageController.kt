package com.sat.study.semiproject

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping


@Controller
class PageController {

    @RequestMapping("/{page}")
    fun index(@PathVariable page: String): String {
        return page
    }
}