const express = require('express');
const router = express.Router();

router.get("/", async function (request, response) {
    try {
        var url = request.query;
        var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (regexp.test(url.address)) {
            if (!Array.isArray(url.address)) url.address = [url.address];
            await response.status(200).render("home", { title: url.address });
        } else {
            url.address = [`${url.address} is not a valid url`]
            await response.status(404).render("home", { title: url.address });
        }
    } catch (err) {
        response.status(404).send({ success: false, message: err.message })
    }
});


router.get('/api', (request, response) => {
    var url = request.query;
    var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (regexp.test(url.address)) {
        if (!Array.isArray(url.address)) url.address = [url.address];
        var a = url.address
    } else {
        url.address = [`${url.address} is not a Valid URL`]
        response.status(404).render("home", { title: url.address });
        return
    }
    Promise.all(a)
        .then(a => {
            response.status(200).render("home", { title: a });
        })
        .catch(err => {
            response.status(404).send({ success: false, message: err.message })
        })
});

module.exports = router;