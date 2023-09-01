window.vuelte = new Vue({
    data: { inner: {} },
    watch: {
        inner: {
            handler(n) {
                // console.log(n)
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        set: function(key, value) {
            if(JSON.stringify(this.inner[key]) != JSON.stringify(value))
                Vue.set(this.inner, key, value);
        },
        get: function(key) {
            return cloneDeep(this.inner[key])
        },
        listen: function(key, handler) {
            return this.$watch('inner.' + key, function(n,o) {
                return handler(cloneDeep(n),cloneDeep(o))
            }, { deep: true })
        }
    }
})
