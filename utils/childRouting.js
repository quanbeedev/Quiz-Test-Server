let renderToView = async function(req, res, view, data) {
    
    return res.render(view, data);
}
exports.renderToView = renderToView;