class Compile {
    // 当前遍历元素 当前vue实例
    constructor (el, vm) {
        // 要遍历的节点
        this.$el = document.getElementById(el)
        this.$vm = vm

        if(this.$el) {
            // 转换内部内容为Fragment
            this.fragment = this.node2Fragment(this.$el)
            // 执行编译
            this.compile(this.fragment)
            // 将编译后的结果追加至$el
            this.$el.appendChild(this.fragment)
        }
    }

    node2Fragment (el) {
        const frag = document.createDocumentFragment()
        // 将el中所有子元素移至frag中
        let child;
        while(child = el.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }

    // 编译
    compile (el) {
        const childsNodes = el.childNodes
        Array.from(childsNodes).forEach(node => {
            if(this.isElement(node)) {
                // 元素节点
                console.log('编译元素' + node.nodeName)
            }else if(this.isInterpolation(node)) {
                // 文本节点 插值格式
                console.log('编译文本' + node.textContent)
                this.compileText(node)
            }

            // 递归子节点
            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    // 元素子节点
    isElement (node) {
        return node.nodeType === 1
    }

    // 文本子节点 {{}}
    isInterpolation (node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText (node) {
        // RegExp.$1 获取正则表达式中第一个()分组匹配到的值
        node.textContent = this.$vm.$data[RegExp.$1]
    }

    // 更新函数 参数：节点、实例、表达式、指令
    update (node, vm, exp, dir) {

    }
}