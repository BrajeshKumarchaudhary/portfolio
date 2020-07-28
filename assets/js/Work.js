$(document).ready(function(){
    callAjaxforSelect("getCountryList","").then(function (response) {
        doOnSelectSucess(response,"#country","getCountryList")
    }).catch(function (response) {
        doOnSelectSucess(response,"#country","getCountryList")
    });
    callAjaxforSelect("getWorkList","").then(function (response) {
        doOnSelectSucess(response,"#workType","getWorkList")
    }).catch(function (response) {
        doOnSelectSucess(response,"#workType","getWorkList")
    });
});

$('#country').on('change', function() {
       var data={"countryCode":""+this.value};
        callAjaxforSelect("getStateList",data).then(function (response) {
            doOnSelectSucess(response,"#state","getStateList")
        }).catch(function (response) {
            doOnSelectSucess(response,"#state","getStateList")
        });
    
  });
 

$("#btnContact").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();
    alert("called");
    var formData = $("#prjinterestedUser").serializeArray();
    console.log(formData);
    // formData.push({'name': 'currenturl', 'value': window.location.href.split('?')[0]})
    makeAjaxCall(formData).then(function (response) {
        doOnLeadSucess(response)
    }).catch(function (response) {
        doOnLeadSucess(response)
    });
});

function makeAjaxCall(formData)
{
    var sitename = "http://localhost:8084/userlead/";
    return new Promise(function(resolve, reject){
       $.ajax({
        type: "POST",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: sitename + 'createNewLead',
        data: formData,
        beforeSend: function () {
            $('.loader').show();
        },
        complete: function () {
            $('.loader').hide();
        },
        success: function (response) {
             resolve(response)
         },
        error:function(error) {
        reject(error)
      }
    });
    });
    }

    function doOnLeadSucess(response)
    {
          if (response == 'success' || response.code == 200) {

          }else if (response == 'dublicate' || response.code == 500) {
            window.location.href = _CA.base_url + 'thankYou';
        } 

    }
    function doOnSelectSucess(response,slectionId,url)
    {
        var myselect = $('<select>');
        $.each(response['data'], function(index, key) {
            if(url=="getCountryList"){
            myselect.append( $('<option></option>').val(key['id']).html(key['countryName']) );
            }else if(url=="getStateList"){
              myselect.append( $('<option></option>').val(key['id']).html(key['stateName']) );
            }else if(url=="getWorkList"){
                myselect.append( $('<option></option>').val(key['id']).html(key['workName']) );
            }  
        });
          $(slectionId).empty(); 
         $(slectionId).append(myselect.html());
    }




    function callAjaxforSelect(url,formdata){
        var sitename="http://localhost:8080/userlead/api/v1/lead/"
        return new Promise(function(resolve, reject){
             $.ajax({
            type: "GET",
            // headers: {
            //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            // },
            url: sitename + url,
            data:formdata,
            beforeSend: function () {
                // $('.loader').show();
            },
            complete: function () {
                // $('.loader').hide();
            },
            success: function (response) {
               resolve(response);
             },
            error:function(error) {
            reject(error);
          }
        });
    });
    }
