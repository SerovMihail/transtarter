import { DirectiveOptions } from 'vue'

export const clickOutside: DirectiveOptions = {
    bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
            const compName = vNode.context && vNode.context.name ? vNode.context.name : ''
            let warn = `[Vue-click-outside:] provided expression '${
                binding.expression
            }' is not a function, but has to be`
            if (compName) {
                warn += `Found in component '${compName}'`
            }
            // eslint-disable-next-line
      console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e: any) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
                binding.value(e)
            }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
        document.addEventListener('touchmove', handler)
    },

    unbind: function(el, binding) {
        // Remove Event Listeners
        if (el.__vueClickOutside__) {
            document.removeEventListener('touchmove', el.__vueClickOutside__)
            document.removeEventListener('click', el.__vueClickOutside__)
        }
        el.__vueClickOutside__ = undefined
    },
}
