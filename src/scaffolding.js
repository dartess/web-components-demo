(function () {
    // активация полифила template до загрузки DOM
    try {
        HTMLTemplateElement.bootstrap(document);
    } catch (e) { }

    // шаблоны
    document.querySelectorAll("template[data-component]").forEach(template => {
        ShadyCSS.prepareTemplate(template, template.dataset["component"]);
    });
})();