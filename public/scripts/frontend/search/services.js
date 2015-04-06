app.service('mbp_helper', function(){
    this.convertDate = function(date, type){

        switch (type){
            case 'mysql':
                return (date && date instanceof Date) ? date.getFullYear() + '-' + addZeroChar(date.getMonth() + 1) + '-' + addZeroChar(date.getDate()) : date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
                break;

            case 'usa':
			default :
                return (date && date instanceof Date) ? addZeroChar(date.getMonth() + 1) + '/' + addZeroChar(date.getDate()) + '/' + date.getFullYear() : date.replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$2/$3/$1");
                break;
        }

		function addZeroChar(val) {
			return ('00'+ val).substr(-2);
		}
    };
	
    this.normalizeArray = function( ar ){
        if ( typeof ar == "object" && typeof ar.length == "undefined" ){
            return [ ar ];
        }
        return ar;
    };


});