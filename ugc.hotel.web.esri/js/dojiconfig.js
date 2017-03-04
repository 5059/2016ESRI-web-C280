var dojoConfig = {
    parseOnLoad: true,
    packages: [
        {
            "name": "bdlib",
            "location": location.pathname.replace(/\/[^/]+$/, '') + "../../lib/bdlib"
        }
        ,
        {
            "name": "tdtlib",
            "location": location.pathname.replace(/\/[^/]+$/, '') + "../../lib/tdtlib"
        }
    ]
};