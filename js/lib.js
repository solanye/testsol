function loadModal(url, ids=''){ 
    var div = '#outcome';
    $.ajax({
        type        :"POST",
        url         :url,
        dataType    :"html",
        data        :{id:ids},
        success:function(response){
            $(div).html(response);
            $('#modal').modal('show');
        }
    });
    return false;
}
function submit(url, form, $elementname, url2 = '', toUpload = ''){ 
    var $form = form;
    var formData = new FormData();

    if(toUpload != ''){
        for (var pair of toUpload.entries()) {
            formData.append(pair[0], pair[1]);
        }
    }

    $form.find(':input').each(function() {
        var element= this;    
        if(element.type === 'file'){     
            if(element.value !== '' && ( $("#"+element.id).prop("files")!=undefined||$("#"+element.id).prop("file")!=undefined) ){
                for(var i=0; i< $('#'+element.id).prop("files").length; i++){
                    formData.append(element.name, $('#'+element.id).prop("files")[i]);   
                }
            }
        }
        else if(element.type === 'text'){
            formData.append(element.name, element.value);
        }
        else if(element.type === 'radio'){
            if(element.checked) formData.append(element.name, element.value);
        }
        else if(element.type === 'number'){
            formData.append(element.name, element.value);
        }
        else if(element.type === 'date'){
            formData.append(element.name, element.value);
        }
        else if(element.type === 'email'){
            formData.append(element.name, element.value);
        }
        else if(element.type === 'time'){
            formData.append(element.name, element.value);
        }
        else if(element.type === 'password'){
            formData.append(element.name, element.value);
        }
        else if(element.type === 'checkbox'){
            if(element.checked) formData.append(element.name, element.value);
        }
    });
    $form.find('select').each(function() {
        var element= this;
        var selectedArray = [];
        for(var i = 0; i < element.options.length; i++ ){
            if (element.options[i].selected) 
                selectedArray.push(element.options[i].value);
        }
        formData.append(element.name, selectedArray);
    });
    $form.find('textarea').each(function() {
        var element = this;
        formData.append(element.name, element.value);
    });
    var $data = 0;
    $.ajax({
        type        :"POST",
        url         :url,
        data        :formData,
        contentType : false,
        processData : false,
        success:function(response){
            console.log(response);
            swal({
                title: $elementname,
                text: "Presiona ok para continuar",
                type: "success"
                }).then((result) => {
                    if(url2!='') window.location.href=url2+response;
            });
        }
    });
}
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
function deletes(url, ids, $elementname, url2 = false){ 
    swal({
        title: "Eliminar",
        text: "¿Está seguro de eliminar "+$elementname+"?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar",
        closeOnConfirm: false
    }).then((result) => {
        $.ajax({
            type        : "POST",
            url         : url,
            data        : JSON.stringify({id: ids}),
            contentType : false,
            async: false,
            success:function(response){
                console.log(response);
                swal({
                    title: "Eliminado!",
                    text: "El "+$elementname+" ha sido eliminado",
                    type: "success"
                    }).then((result) => {
                        if(url2 == false) $('#row'+ids).remove();
                        else window.location.href=url2; 
                });
            }
        });
    });
}
var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var splitRight = splitRight.substr(0,3);
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
        },
        convert:function(num, simbol){
            this.simbol = simbol ||'';
        return this.formatear(num);
    }
}
Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
};
function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
function ch_State (ids){  
    var city = document.getElementById('city');
    city.options.length = 0;
    $.ajax({
        type        : "POST",
        url         : "index.php/general/getCities",
        data        : JSON.stringify({id: ids}),
        contentType : false,
        async: false,
        success:function(data){
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                city.options[i] = new Option(data[i]['nombre'], data[i]['id']);
            }
        }
    });
}
function showDiv (a,b) {
    $('#show'+a).css('display','none');
    $('#show'+b).css('display','');
    $('#button-image').css('display','none');    
}
function showMsj(msj, ty) {
    swal({
        title:'',
        text: msj,
        type: ty,
    });
}
function blockloader(block_ele, classy) {

    // Block Element
    block_ele.block({
        message: '<div class="loader-wrapper"><div class="loader-container"><div class="'+classy+'"><div></div><div></div></div></div></div>',
        overlayCSS: {
            backgroundColor: '#FFF',
            cursor: 'wait',
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none'
        }
    });
}