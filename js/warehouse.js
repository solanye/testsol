/********************************************
*         form validation         *
********************************************/
(function(window, document, $) {
    'use strict';
    // Input, Select, Textarea validations except submit button
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();   
})(window, document, jQuery);

$( "#form" ).submit(function( event ) {
    event.preventDefault();
    
    var url = 'index.php/warehouse/savewarehouse?pass=Cardio12345';
    var form = $("#form");
    var element = 'El almacén ha sido guardado';
    var url2 = 'warehouse_list?pass=Cardio12345';
    submit(url, form, element, url2);
});
