const { renderToView }  = require("../utils/childRouting")
class SingInControler{
    quiz(req, res) {
        renderToView(req, res , 'pages/quiz')
    }
}
module.exports = SingInControler