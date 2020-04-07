class SVue {
    constructor (options) {
        this.$options = options

        // 数据响应
        this.$data = options.data
        this.observe(this.$data)

        // 模拟watcher创建
        // new Watcher()
        // this.$data.test;
        // new Watcher()
        // this.$data.foo.bar;

        // 编译
        new Compile(options.el, this)
    }
    // 观察者
    observe (val) {
        if(!val || typeof val !== 'object') return
        // 遍历data
        Object.keys(val).forEach(key => {
            this.defineReactive(val, key, val[key])
        })
    }
    // 数据响应化
    defineReactive (obj, key, val) {
        // 递归 解决数据嵌套
        this.observe(val)

        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get () {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set (newVal) {
                if(val === newVal) return
                val = newVal
                // console.log(`${key}属性更新了：${val}`)
                dep.notify()
            }
        })
    }
}

// 用来管理watcher
class Dep {
    constructor () {
        // 存放若干依赖
        this.deps = []
    }

    // 添加依赖
    addDep (dep) {
        this.deps.push(dep)
    }

    // 通知watcher，更新依赖
    notify () {
        this.deps.forEach(dep => dep.update())
    }
}

// watcher
class Watcher {
    constructor () {
        // 将当前watcher实例指向Dep静态属性target
        Dep.target = this
    }

    update () {
        console.log('属性更新了')
    }
}