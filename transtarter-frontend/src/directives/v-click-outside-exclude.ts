import { DirectiveOptions, VNode } from 'vue'

let handleOutsideClick: any

export const closable: DirectiveOptions = {
    bind(el, binding, vnode: VNode) {
        // Here's the click/touchstart handler
        // (it is registered below)
        handleOutsideClick = (e: any) => {
            e.stopPropagation()
            // Get the handler method name and the exclude array
            // from the object used in v-closable
            const { handler, exclude, componentName, excludeIds } = binding.value
            // This variable indicates if the clicked element is excluded
            let clickedOnExcludedEl = false

            if (<string[]>excludeIds) {
                excludeIds.forEach((excludeId: string) => {
                    const excludeElById = window.document.getElementById(excludeId)
                    if (
                        excludeElById &&
                        (excludeElById.offsetWidth > 0 && excludeElById.offsetHeight > 0)
                    ) {
                        clickedOnExcludedEl = excludeElById.contains(e.target)
                    }
                    // if (excludeElById) {
                    //     clickedOnExcludedEl = excludeElById.contains(e.target);
                    // }
                })
            }
            if (exclude) {
                exclude.forEach((refName: any) => {
                    // We only run this code if we haven't detected
                    // any excluded element yet
                    if (!clickedOnExcludedEl) {
                        // Get the element using the reference name
                        const excludedEl: any = vnode.context!.$refs[refName]
                        // See if this excluded element
                        // is the same element the user just clicked on
                        clickedOnExcludedEl = excludedEl.contains(e.target)
                    }
                })
            }
            // We check to see if the clicked element is not
            // the dialog element and not excluded
            if (
                !el.contains(e.target) &&
                !clickedOnExcludedEl &&
                e.target.localName !== componentName
            ) {
                // If the clicked element is outside the dialog
                // and not the button, then call the outside-click handler
                // from the same component this directive is used in
                // @ts-ignore: Unreachable code error
                vnode.context[handler]()
            }
        }

        // Register click/touchstart event listeners on the whole page
        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('touchstart', handleOutsideClick)
    },
    unbind() {
        // If the element that has v-closable is removed, then
        // unbind click/touchstart listeners from the whole page
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
    },
}
