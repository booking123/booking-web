app.filter('html', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml( text );
    };
}]);

app.filter('price', [function(){
    return function(price, ceil){
        price = ( typeof ceil == 'undefined' ) ? price : Math.ceil( price );
        return parseFloat(price).toFixed( ceil ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}]);

app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice( start );
    }
});