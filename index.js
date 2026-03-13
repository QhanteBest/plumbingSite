function loadComponent(id, htmlFile, jsFile){
    fetch (htmlFile)
    .then(response=>response.text())
    .then(data=> {
        document.getElementById(id).innerHTML = data;
        if (jsFile) {
            const script = document.createElement("script");
            script.src = jsFile;
            script.defer = true;
            document.body.appendChild(script);
        }
    })
    .catch(error => console.error("Error loading component:", error));
}

//Loading html + respective js
loadComponent("navbar", "./OtherHtmlfiles/nav.html", "./Alljs/nav.js");
loadComponent("products", "./OtherHtmlfiles/products.html", "./Alljs/products.js");
loadComponent("accessories", "./OtherHtmlfiles/accessories.html", "./Alljs/accessories.js");
loadComponent("services", "./OtherHtmlfiles/services.html", "./Alljs/services.js");
loadComponent("contact", "./OtherHtmlfiles/contact.html", "./Alljs/contact.js");
loadComponent("footer", "./OtherHtmlfiles/footer.html", "./Alljs/footer.js");


