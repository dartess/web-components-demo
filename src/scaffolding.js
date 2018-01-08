(function () {
    // подмена insertAdjacentHTML, если полифил
    if ("polyfillWrapFlushCallback" in customElements) {
        HTMLElement.prototype.insertAdjacentHTML = function (position, html) {
            "use strict";

            var ref = this,
                container = ref.ownerDocument.createElementNS(
                    "http://www.w3.org/1999/xhtml",
                    "_"
                ),
                ref_parent = ref.parentNode,
                node,
                first_child,
                next_sibling;

            container.innerHTML = html;

            switch (position.toLowerCase()) {
                case "beforebegin":
                    while ((node = container.firstChild)) {
                        ref_parent.insertBefore(node, ref);
                    }
                    break;
                case "afterbegin":
                    first_child = ref.firstChild;
                    while ((node = container.lastChild)) {
                        first_child = ref.insertBefore(node, first_child);
                    }
                    break;
                case "beforeend":
                    while ((node = container.firstChild)) {
                        ref.appendChild(node);
                    }
                    break;
                case "afterend":
                    next_sibling = ref.nextSibling;
                    while ((node = container.lastChild)) {
                        next_sibling = ref_parent.insertBefore(node, next_sibling);
                    }
                    break;
            }
        };
    }

    // активация полифила template до загрузки DOM
    try {
        HTMLTemplateElement.bootstrap(document);
    } catch (e) { }

    // шаблоны
    document.querySelectorAll("template[data-component]").forEach(function(template) {
        ShadyCSS.prepareTemplate(template, template.dataset["component"]);
    });
})();