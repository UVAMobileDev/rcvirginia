$(document).ready(function() {
    $("#status-message").hide();
    refreshStatusTable();
    setInterval(refreshStatusTable, 60000);
    checkStatusMessages();
    setInterval(checkStatusMessages, 60000);
    refreshJobsTable();
    setInterval(refreshJobsTable, 60000);
});

function checkStatusMessages() {
    $.getJSON('https://tajhvw17z0.execute-api.us-east-1.amazonaws.com/prod/system/messages', function(data) {
        var messageData = '';
        $.each(data, function(key, value) {
            var messageBody = value.body;
            var messageLength = messageBody.length;
            if ( messageLength < 22 ) {
                $("#status-message").hide();
            } else {
                $("#status-message").show();
                messageData += '<span style="color:tomato;padding-right:4px;"><i class="fas fa-exclamation-triangle"></i></span>';
                messageData += value.body;
                $('#status-message-content').html(messageData);
            }
        });
    });
}

function refreshStatusTable(){
    $.getJSON('https://tajhvw17z0.execute-api.us-east-1.amazonaws.com/prod/system/health', function(data) {
        var statusData = '';
        $.each(data, function(key, value) {
            statusData += '<tr>';
            statusData += '<td>'+value.title+'</td>';
            statusData += '<td class="" style="vertical-align:middle;" valign="middle" align="center"><img style="" src=https://www.rc.virginia.edu'+value.image+' /></td>';
            statusData += '</tr>';
        });
        $('#statusBody').html(statusData);
    });
}

function refreshJobsTable(){
    $.getJSON('https://tajhvw17z0.execute-api.us-east-1.amazonaws.com/prod/system/jobs', function(data) {
        var jobData = '';
        $.each(data, function(key, value) {
            jobData += '<tr>';
            jobData += '<td>'+value.partition+'</td>';
            jobData += '<td>'+value.jobs+'</td>';
            jobData += '</tr>';     
        });
        $('#jobsBody').html(jobData);
    });
}
