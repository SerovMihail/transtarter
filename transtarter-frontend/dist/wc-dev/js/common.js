//sticky-global-header
document.addEventListener("DOMContentLoaded", function(event) {
    const bitrixHeaderDiv = document.querySelector("#ts-ui-header");
    if (!bitrixHeaderDiv) {
        return;
    }
    
    bitrixHeaderDiv.setAttribute("style", "position: sticky; top: 0px; z-index: 99950");
});

//lazy load for .lozad
document.addEventListener("DOMContentLoaded", () => {
    if (!lozad) {
        return;
    }

    var observer = lozad('.lozad', {
        rootMargin: '100px'
    });
    observer.observe();
});