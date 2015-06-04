require([
    'views/home',
    'views/header',
    'views/footer',
], function (HomeView, HeaderView, FooterView) {
    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "*actions": "home"
        },
        initialize: function() {
            this.headerView = new HeaderView();
            this.headerView.render();
            this.footerView = new FooterView();
            this.footerView.render();
        },
        home: function() {
            this.homeView = new HomeView();
            this.homeView.render();
        }
    });

    app = new ApplicationRouter();
    Backbone.history.start();
});